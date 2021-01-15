import { Shop } from '../models/shop';
import { IShop } from '../types';

export async function createShop(newShop: IShop) {
	return await Shop.create(newShop).then(shop => shop.toObject());
}

export async function getShopsOfAVendor(vendorId: string) {
	return await Shop.find({ owner: vendorId }).lean();
}

export async function getShopById(shopId: string) {
	return await Shop.findOne({ _id: shopId }).lean();
}

//
export async function checkIfShopExists(shopName: string) {
	return await Shop.exists({
		$or: [{ name: shopName }],
	});
}

export async function updateShopOfAVendor(shopId: string, updatePayload: Partial<IShop>) {
	return await Shop.findOneAndUpdate({ _id: shopId }, { ...updatePayload }, { new: true }).lean();
}
