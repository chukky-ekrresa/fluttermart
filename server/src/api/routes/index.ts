import { Router } from 'express';

import AuthRouter from './auth';
import ShopRouter from './shop';
import ProductRouter from './product';
import orderRouter from './order';

const router = Router();

router.get('/', (_req, res) => {
	res.status(200).send('Fluttermart backend service running');
});

router.use('/auth', AuthRouter);
router.use('/shops', ShopRouter);
router.use('/products', ProductRouter);
router.use('/orders', orderRouter);

export default router;
