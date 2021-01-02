import { Request } from 'express';

import { ApiResponse } from '../types';
import * as AuthService from '../services/auth';

export async function signUpHandler(req: Request, res: ApiResponse) {
	await AuthService.signUp(req.body);
	res.status(201).json({ status: 201, message: 'user registration was successful!' });
}

export async function loginHandler(req: Request, res: ApiResponse) {
	const token = await AuthService.login(req.body);
	res.status(201).json({ status: 201, message: 'user registration was successful!', data: token });
}
