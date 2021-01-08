import bcrypt from 'bcrypt';
import faker from 'faker';
import { NotFound, Forbidden } from 'http-errors';

import { getLoggedInUser } from '../helpers/requestSession';
import * as ShopRepo from '../repositories/shopRepo';
import { createUser } from '../repositories/userRepo';
import { IShop, IUser } from '../types';

export async function createShop(payload: IShop) {
	const loggedInUser = getLoggedInUser();

	payload.owner = loggedInUser.id!;
	const dispatchRider = await generateDispatchRider();
	payload.dispatchRider = dispatchRider._id;

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
		email: faker.internet.email(),
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
