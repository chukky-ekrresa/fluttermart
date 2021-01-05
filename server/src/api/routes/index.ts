import { Router } from 'express';

import AuthRouter from './auth';

const router = Router();

router.get('/', (_req, res) => {
	res.status(200).send('Fluttermart backend service running');
});

router.use('/auth', AuthRouter);

export default router;
