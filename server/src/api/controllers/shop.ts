import { Request } from 'express';

import * as ShopService from '../services/shop';
import { ApiResponse } from '../types';

export async function createShopHandler(req: Request, res: ApiResponse) {
	const newShop = await ShopService.createShop(req.body);
	res.status(201).json({ status: 201, message: 'Shop created!', data: newShop });
}

export async function getVendorShopsHandler(_req: Request, res: ApiResponse) {
	const vendorShops = await ShopService.getVendorShops();
	res.status(200).json({ status: 200, message: 'Shops found!', data: vendorShops });
}

export async function updateVendorShopHandler(req: Request, res: ApiResponse) {
	const shop = await ShopService.updateVendorShop(req.params.shopId, req.body);
	res.status(200).json({ status: 200, message: 'Shop Updated!', data: shop });
}
