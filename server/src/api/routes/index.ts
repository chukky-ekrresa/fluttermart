import { Router } from 'express';

import AuthRouter from './auth';
import ShopRouter from './shop';

const router = Router();

router.get('/', (_req, res) => {
	res.status(200).send('Fluttermart backend service running');
});

router.use('/auth', AuthRouter);
router.use('/shops', ShopRouter);

export default router;
