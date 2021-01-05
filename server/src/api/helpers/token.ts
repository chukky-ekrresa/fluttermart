import jwt, { SignOptions } from 'jsonwebtoken';

import ENV_VARS from '../../config/env';
import { IUser } from '../types';

export function issueAccessToken(
	payload: Partial<IUser>,
	secret: string = ENV_VARS.ACCESS_TOKEN_SECRET,
	options: SignOptions = {}
) {
	return jwt.sign(payload, secret, { expiresIn: '24h', ...options });
}
