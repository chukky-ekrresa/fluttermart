import { Product } from '../models/product';
import { IProduct } from '../types';

export async function getAllProducts() {
	return await Product.find().limit(50).lean({ virtuals: true }).exec();
}

export async function getProductsOfAShop(shopId: string) {
	return await Product.find({ shop: shopId }).limit(50).lean({ virtuals: true }).exec();
}

export async function insertProduct(product: IProduct) {
	return await Product.create(product);
}
