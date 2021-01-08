import { celebrate } from 'celebrate';
import { Router } from 'express';

import * as ShopCtrl from '../controllers/shop';
import { NEW_SHOP, UPDATE_SHOP } from '../validations/shop';
import { ensureUserIsAVendor } from '../middleware/authorization';

const router = Router();

router.post(
	'/',
	ensureUserIsAVendor,
	celebrate(NEW_SHOP, { abortEarly: false, stripUnknown: true }),
	ShopCtrl.createShopHandler
);

router.put(
	'/:shopId',
	ensureUserIsAVendor,
	celebrate(UPDATE_SHOP, { abortEarly: false, stripUnknown: true })
);

router.get('/me', ensureUserIsAVendor, ShopCtrl.getVendorShopsHandler);

export default router;
