import bcrypt from 'bcrypt';
import faker from 'faker';
import { NotFound, Forbidden, BadRequest } from 'http-errors';
import Flutterwave from 'flutterwave-node-v3';

import * as ShopRepo from '../repositories/shopRepo';
import { createUser } from '../repositories/userRepo';
import ENV_VARS from '../../config/env';
import { getLoggedInUser } from '../helpers/requestSession';
import { IShop, IUser } from '../types';
import { logger } from '../../config/logger';

export async function createShop(payload: IShop) {
	const { email, name, phoneNumber } = payload;
	const shop = await ShopRepo.checkIfShopExists(name, email, phoneNumber);

	if (shop) {
		throw new BadRequest(`Shop with name: ${payload.name} exists`);
	}

	await validateShopPayment(payload.transactionId, payload.transactionRef);

	const loggedInUser = getLoggedInUser();
	const dispatchRider = await generateDispatchRider();

	payload.owner = loggedInUser.id!;
	payload.dispatchRider = dispatchRider._id;
	payload.approved = true;

	return await ShopRepo.createShop(payload);
}

export async function getVendorShops() {
	const loggedInUser = getLoggedInUser();

	return await ShopRepo.getShopsOfAVendor(loggedInUser.id!);
}

export async function updateVendorShop(shopId: string, updatePayload: Partial<IShop>) {
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
	const { FLW_PUBLIC_KEY, FLW_SECRET_KEY } = ENV_VARS;
	const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);

	const response = await flw.Transaction.verify({ id: transactionId, amount: '20' });

	if (
		response.status === 'success' &&
		response.data.amount >= 20 &&
		response.data.tx_ref === String(transactionRef) &&
		response.data.currency === 'NGN'
	) {
		return;
	}

	logger.error(response.message);

	throw new BadRequest('Shop payment was not successful');
}
