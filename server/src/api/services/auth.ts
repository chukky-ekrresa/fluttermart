import { BadRequest, Unauthorized } from 'http-errors';
import bcrypt from 'bcrypt';

import * as UserRepo from '../repositories/userRepo';
import { IUser } from '../types';
import { issueAccessToken } from '../helpers/token';
import { generateOTP } from '../helpers/otp';
import { logger } from '../../config/logger';
import { agendaInstance } from '../../config/agenda';

export async function verifyUserAccount(payload: IVerify) {
	const { otp, userId } = payload;
	const user = await UserRepo.verifyOtp(otp, userId);

	if (!user) {
		throw new BadRequest('Invalid request');
	}

	const { _id: id, email, firstName, lastName, role } = user;

	await UserRepo.removeUserOtpAndEnableUser(id);

	logger.info(`User ${id} login time: ${new Date().toUTCString()}`);

	return issueAccessToken({ id, email, firstName, lastName, role });
}

export async function login(payload: ILogin) {
	const { email: userEmail, password } = payload;
	const user = await UserRepo.getUserByEmail(userEmail);

	if (!user) {
		throw new Unauthorized('invalid email/password');
	}

	if (!user.enabled && !user.emailVerified) {
		throw new Unauthorized(
			'Your account is not active. Please verify your email or contact fluttermart'
		);
	}

	const passwordExists = await bcrypt.compare(password, user.password);

	if (!passwordExists) {
		throw new Unauthorized('Invalid email/password');
	}

	const { _id: id, email, firstName, lastName, role } = user;

	logger.info(`User ${id} login time: ${new Date().toUTCString()}`);

	return issueAccessToken({ id, email, firstName, lastName, role });
}

export async function signUp(userPayload: IUser) {
	const { email: userEmail, password } = userPayload;
	const user = await UserRepo.getUserByEmail(userEmail);

	if (user) {
		throw new BadRequest(`user with email ${userEmail} exists`);
	}

	const passwordPromise = bcrypt.hash(password, 10);
	const otpPromise = generateOTP();

	const [otp, hashedPassword] = await Promise.all([otpPromise, passwordPromise]);

	userPayload.password = hashedPassword;
	userPayload.otp = otp;

	const newUser = await UserRepo.createUser(userPayload);

	agendaInstance.now('send email', {
		html: `<h2>${newUser.otp}</h2>`,
		to: newUser.email,
		subject: 'Email Verification',
	});

	return newUser._id;
}

interface ILogin {
	email: string;
	password: string;
}

interface IVerify {
	userId: string;
	otp: string;
}
