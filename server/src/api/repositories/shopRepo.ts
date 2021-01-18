import { Shop } from '../models/shop';
import { IAccount, IShop } from '../types';

export async function createShop(newShop: IShop) {
	return await Shop.create(newShop).then(shop => shop.toObject());
}

export async function fetchAccountInfo(shopId: string) {
	return await Shop.findOne({ _id: shopId })
		.select('account dispatchRider')
		.populate({ path: 'dispatchRider', select: 'account' })
		.lean();
}

export async function getAllShops() {
	return await Shop.find().limit(50).select({ account: 0 }).lean();
}

export async function getShopsOfAVendor(vendorId: string) {
	return await Shop.find({ owner: vendorId }).limit(50).lean();
}

export async function getShopById(shopId: string) {
	return await Shop.findOne({ _id: shopId }).populate({ path: 'dispatchRider' }).lean();
}

export async function checkIfShopExists(shopName: string) {
	return await Shop.exists({
		$or: [{ name: shopName }],
	});
}

export async function updateShopOfAVendor(shopId: string, updatePayload: Partial<IShop>) {
	return await Shop.findOneAndUpdate({ _id: shopId }, { ...updatePayload }, { new: true }).lean();
}

export async function updateShopAccount(shopId: string, accountInfo: IAccount) {
	return await Shop.findOneAndUpdate({ _id: shopId }, { account: { ...accountInfo } }).lean();
}
