import { celebrate } from 'celebrate';
import { Router } from 'express';

import * as ShopCtrl from '../controllers/shop';
import { NEW_SHOP, UPDATE_SHOP } from '../validations/shop';
import { ensureUserIsAuthenticated, ensureUserIsAVendor } from '../middleware/authorization';
import { imageMiddleware } from '../middleware/upload';

const router = Router();

router.post(
	'/',
	ensureUserIsAVendor,
	imageMiddleware,
	celebrate(NEW_SHOP, { abortEarly: false, stripUnknown: true }),
	ShopCtrl.createShopHandler
);

router.put(
	'/:shopId',
	ensureUserIsAVendor,
	celebrate(UPDATE_SHOP, { abortEarly: false, stripUnknown: true }),
	ShopCtrl.updateVendorShopHandler
);

router.get('/:shopId/account_info', ensureUserIsAuthenticated, ShopCtrl.getShopAccountHandler);
router.get('/me', ensureUserIsAVendor, ShopCtrl.getVendorShopsHandler);
router.get('/', ShopCtrl.getAllShopsHandler);

export default router;
