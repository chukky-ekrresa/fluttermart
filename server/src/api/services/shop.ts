import bcrypt from 'bcrypt';
import faker from 'faker';
import { NotFound, Forbidden, BadRequest } from 'http-errors';
import { addMinutes } from 'date-fns';

import * as ShopRepo from '../repositories/shopRepo';
import { agendaInstance } from '../../config/agenda';
import { createUser } from '../repositories/userRepo';
import flw from '../../config/flutterwave';
import { getLoggedInUser } from '../helpers/requestSession';
import { IShop, IUser } from '../types';
import { logger } from '../../config/logger';
import { processImage } from '../helpers/processImage';
import { uploadImage } from '../helpers/uploadImage';
import { snakeCase } from 'lodash';

export async function createShop(payload: IShop, shopImage: any) {
	await validateShopPayment(payload.transactionId, payload.transactionRef);

	const shop = await ShopRepo.checkIfShopExists(payload.name);

	if (shop) {
		throw new BadRequest(`Shop with name: ${payload.name} exists`);
	}

	const dispatchRiderPromise = generateDispatchRider();
	const imageBuffer = await processImage(shopImage);
	const uploadResponse = await uploadImage({
		filename: snakeCase(payload.name),
		image: imageBuffer,
		shop: snakeCase(payload.name),
	});

	const loggedInUser = getLoggedInUser();
	const dispatchRider = await dispatchRiderPromise;

	payload.owner = loggedInUser.id!;
	payload.dispatchRider = dispatchRider._id;
	payload.approved = true;
	payload.image = { publicId: uploadResponse.public_id, url: uploadResponse.secure_url };

	const newShop = await ShopRepo.createShop(payload);
	agendaInstance.now('create_subaccount_shop', {
		...newShop,
		firstName: loggedInUser.firstName,
	});

	// Schedule after 3 minutes so the account number to be used don't clash with the one used in creating a shop
	agendaInstance.schedule(addMinutes(new Date(), 3), 'create_subaccount_dispatch', {
		...dispatchRider,
		country: newShop.country,
		firstName: loggedInUser.firstName,
		shopId: newShop._id,
	});

	return newShop;
}

export async function getAllShops() {
	return await ShopRepo.getAllShops();
}

export async function getVendorShops() {
	const loggedInUser = getLoggedInUser();

	return await ShopRepo.getShopsOfAVendor(loggedInUser.id!);
}

export async function getShopAccountInfo(shopId: string) {
	return await ShopRepo.fetchAccountInfo(shopId);
}

export async function updateVendorShop(shopId: string, updatePayload: any) {
	const shop = await ShopRepo.updateShopOfAVendor(shopId, updatePayload);
	const loggedInUser = getLoggedInUser();

	if (!shop) {
		throw new NotFound('Shop does not exist.');
	}

	if (loggedInUser.id !== shop.owner.toString()) {
		throw new Forbidden('Shop cannot be updated by you');
	}

	return shop;
}

async function generateDispatchRider() {
	const dispatchRider: IUser = {
		email: faker.internet.email().toLowerCase(),
		emailVerified: true,
		enabled: true,
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		password: bcrypt.hashSync('password', 10),
		phoneNumber: faker.phone.phoneNumber(),
		phoneNumberVerified: true,
		role: 'dispatch',
	};

	return await createUser(dispatchRider);
}

async function validateShopPayment(transactionId: string, transactionRef: string) {
	const response = await flw.Transaction.verify({ id: transactionId, amount: '20' });

	if (response.status === 'success' && response.data.tx_ref === String(transactionRef)) {
		return;
	}

	logger.error(response.message);

	throw new BadRequest('Shop payment was not successful');
}
