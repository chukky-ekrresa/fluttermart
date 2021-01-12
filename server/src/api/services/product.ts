import { BadRequest, Forbidden } from 'http-errors';
import { snakeCase } from 'lodash';

import * as ProductRepo from '../repositories/productRepo';
import * as ShopRepo from '../repositories/shopRepo';
import { getLoggedInUser } from '../helpers/requestSession';
import { processImage } from '../helpers/processImage';
import { uploadImage } from '../helpers/uploadImage';
import { generateSKU } from '../helpers/sku';
import { IProduct } from '../types';

export async function createProduct(newProduct: IProduct, productImage: any) {
	const loggedInUser = getLoggedInUser();

	const shopProductExistsPromise = ProductRepo.checkIfShopProductExists(
		newProduct.shop as string,
		newProduct.name
	);
	const shopPromise = ShopRepo.getShopById(newProduct.shop as string);

	const [shop, shopProductExists] = await Promise.all([shopPromise, shopProductExistsPromise]);

	if (!shop) {
		throw new BadRequest('Shop provided does not exist');
	}

	if (shopProductExists) {
		throw new BadRequest('Product exists in the shop');
	}

	if (shop.owner !== loggedInUser.id) {
		throw new Forbidden(`Unauthorized action`);
	}

	const imageBuffer = await processImage(productImage);
	const uploadResponse = await uploadImage({
		filename: snakeCase(newProduct.name),
		image: imageBuffer,
		shop: snakeCase(shop.name),
	});

	newProduct.sku = generateSKU();
	newProduct.image = { url: uploadResponse.secure_url, publicId: uploadResponse.public_id };

	return await ProductRepo.insertProduct(newProduct);
}

export async function getAllProducts() {
	return await ProductRepo.getAllProducts();
}

export async function getProductsOfAShop(shopId: string) {
	return await ProductRepo.getProductsOfAShop(shopId);
}
