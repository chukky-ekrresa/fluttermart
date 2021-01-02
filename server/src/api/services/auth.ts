import { BadRequest, Unauthorized } from 'http-errors';
import bcrypt from 'bcrypt';

import { createUser, getUserByEmail } from '../repositories/userRepo';
import { IUser } from '../types';
import { issueAccessToken } from '../helpers/token';

export async function confirmUserAccount(payload: any) {
	return payload;
}

export async function signUp(userPayload: IUser) {
	const { email: userEmail, password } = userPayload;
	const user = await getUserByEmail(userEmail);

	if (user) {
		throw new BadRequest(`user with email ${userEmail} exists`);
	}

	userPayload.password = await bcrypt.hash(password, 10);

	await createUser(userPayload);

	//TODO: Send email verification mail containing OTP
}

export async function login(payload: ILogin) {
	const { email: userEmail, password } = payload;
	const user = await getUserByEmail(userEmail);

	if (!user) {
		throw new Unauthorized('invalid email/password');
	}

	if (!user.enabled && !user.emailVerified) {
		throw new Unauthorized(
			'your account is not active. Please verify your email or contact fluttermart'
		);
	}

	const passwordExists = await bcrypt.compare(password, user.password);

	if (!passwordExists) {
		throw new Unauthorized('invalid email/password');
	}

	const { id, email, firstName, lastName, role } = user;

	return issueAccessToken({ id, email, firstName, lastName, role });
}

interface ILogin {
	email: string;
	password: string;
}
