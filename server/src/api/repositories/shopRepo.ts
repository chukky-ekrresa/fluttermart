import { Shop } from '../models/shop';
import { IShop } from '../types';

export async function createShop(newShop: IShop) {
	return await Shop.create(newShop);
}

export async function getShopsOfAVendor(vendorId: string) {
	return await Shop.find({ owner: vendorId }).lean();
}

export async function getShopById(shopId: string) {
	return await Shop.findOne({ _id: shopId }).lean();
}

export async function updateShopOfAVendor(shopId: string, updatePayload: Partial<IShop>) {
	return await Shop.findOneAndUpdate({ _id: shopId }, { ...updatePayload }, { new: true }).lean();
}
