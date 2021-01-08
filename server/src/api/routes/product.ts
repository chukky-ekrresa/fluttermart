import { celebrate } from 'celebrate';
import { Router } from 'express';

import * as ProductCtrl from '../controllers/product';
import { NEW_PRODUCT } from '../validations/product';
import { ensureUserIsAVendor } from '../middleware/authorization';

const router = Router();

router.post(
	'/:shopId',
	ensureUserIsAVendor,
	celebrate(NEW_PRODUCT, { abortEarly: false, stripUnknown: true }),
	ProductCtrl.createProductHandler
);

router.get('/:shopId', ProductCtrl.getProductsOfAShopHandler);

router.get('/', ProductCtrl.getAllProductsHandler);

export default router;
