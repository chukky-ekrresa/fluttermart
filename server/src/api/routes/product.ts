import { celebrate } from 'celebrate';
import { Router } from 'express';

import * as ProductCtrl from '../controllers/product';
import { NEW_PRODUCT } from '../validations/product';
import { ensureUserIsAVendor } from '../middleware/authorization';
import { imageMiddleware } from '../middleware/upload';

const router = Router();

router.get('/shop/:shopId', ProductCtrl.getProductsOfAShopHandler);

router.post(
	'/',
	ensureUserIsAVendor,
	imageMiddleware,
	celebrate(NEW_PRODUCT, { abortEarly: false, stripUnknown: true }),
	ProductCtrl.createProductHandler
);

router.get('/', ProductCtrl.getAllProductsHandler);

export default router;
