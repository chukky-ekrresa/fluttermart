import { celebrate } from 'celebrate';
import { Router } from 'express';

import * as OrderCtrl from '../controllers/order';
import { ensureUserIsAuthenticated } from '../middleware/authorization';
import { NEW_ORDER, ORDER_PARAMS } from '../validations/order';

const router = Router({ mergeParams: true });

router.post(
	'/',
	ensureUserIsAuthenticated,
	celebrate(NEW_ORDER, { abortEarly: false, stripUnknown: true }),
	OrderCtrl.createOrderHandler
);

router.put(
	'/:orderId/cancel',
	ensureUserIsAuthenticated,
	celebrate(ORDER_PARAMS, { abortEarly: false, stripUnknown: true }),
	OrderCtrl.cancelOrderHandler
);

router.get('/me', ensureUserIsAuthenticated, OrderCtrl.getCustomerOrdersHandler);

export default router;
