import * as ProductRepo from '../repositories/productRepo';
import { getLoggedInUser } from '../helpers/requestSession';
import { generateSKU } from '../helpers/sku';
import { IProduct } from '../types';

export async function createProduct(newProduct: IProduct) {
	const loggedInUser = getLoggedInUser();

	newProduct.owner = loggedInUser.id!;
	newProduct.sku = generateSKU();

	return await ProductRepo.insertProduct(newProduct);
}

export async function getAllProducts() {
	return await ProductRepo.getAllProducts();
}

export async function getProductsOfAShop(shopId: string) {
	return await ProductRepo.getProductsOfAShop(shopId);
}
