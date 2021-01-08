import { Request } from 'express';

import * as ProductService from '../services/product';
import { ApiResponse } from '../types';

export async function createProductHandler(req: Request, res: ApiResponse) {
	const product = await ProductService.createProduct(req.body);
	res.status(201).json({ status: 201, message: 'Product created!', data: product });
}

export async function getAllProductsHandler(_req: Request, res: ApiResponse) {
	const products = await ProductService.getAllProducts();
	res.status(200).json({ status: 200, message: 'Products found!', data: products });
}

export async function getProductsOfAShopHandler(req: Request, res: ApiResponse) {
	const products = await ProductService.getProductsOfAShop(req.params.shopId);
	res.status(200).json({ status: 200, message: 'Products found!', data: products });
}
