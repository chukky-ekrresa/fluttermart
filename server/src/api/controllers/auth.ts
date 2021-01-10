import { Request } from 'express';

import { ApiResponse } from '../types';
import * as AuthService from '../services/auth';

export async function signUpHandler(req: Request, res: ApiResponse) {
	const userId = await AuthService.signUp(req.body);
	res.status(201).json({ status: 201, message: 'user registration was successful!', data: userId });
}

export async function loginHandler(req: Request, res: ApiResponse) {
	const token = await AuthService.login(req.body);
	res.status(200).json({ status: 200, message: 'user logged in successfully!', data: token });
}

export async function verifyUserAccountHandler(req: Request, res: ApiResponse) {
	const data = await AuthService.verifyUserAccount(req.body);
	res.status(201).json({ status: 201, message: 'user account is confirmed!', data });
}
