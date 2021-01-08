import { NextFunction, Request, Response } from 'express';
import { Forbidden, Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';

import ENV_VARS from '../../config/env';
import { getLoggedInUser, session, setLoggedInUser } from '../helpers/requestSession';
import { IUser } from '../types';

export const ensureUserIsAVendor = [ensureUserIsAuthenticated, checkUserRole('vendor')];

export function ensureUserIsAuthenticated(req: Request, _res: Response, next: NextFunction) {
	const token = getAccessToken(req);

	if (!token) {
		throw new Unauthorized('Please login');
	}

	jwt.verify(token, ENV_VARS.ACCESS_TOKEN_SECRET, (err, payload) => {
		if (err) {
			throw new Unauthorized('Please login');
		}

		const userData = payload as Partial<IUser>;

		session.run(() => {
			setLoggedInUser(userData);
			next();
		});
	});
}

function checkUserRole(role: string) {
	return function (_req: Request, _res: Response, next: NextFunction) {
		const loggedInUser = getLoggedInUser();

		if (!loggedInUser) {
			throw new Forbidden('Unauthorized action');
		}

		if (role !== loggedInUser.role) {
			throw new Forbidden('Unauthorized action');
		}

		next();
	};
}

function getAccessToken(req: Request) {
	if (req.headers.authorization) {
		const parts = req.headers.authorization.split(' ');

		if (parts.length !== 2) {
			return null;
		}

		const [scheme, token] = parts;

		if (/^Bearer$/i.test(scheme)) {
			return token;
		}
	}

	return null;
}
