import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as AuthCtrl from '../controllers/auth';
import { REGISTER, LOGIN } from '../validations/auth';

const router = Router({ mergeParams: true });

router.post(
	'/register',
	celebrate(REGISTER, { abortEarly: false, stripUnknown: true }),
	AuthCtrl.signUpHandler
);

router.post(
	'/login',
	celebrate(LOGIN, { abortEarly: false, stripUnknown: true }),
	AuthCtrl.loginHandler
);

export default router;
