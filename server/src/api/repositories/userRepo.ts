import { User } from '../models/user';

import { IUser } from '../types';

export async function createUser(newUser: IUser) {
	return await User.create(newUser);
}

export async function getUserByEmail(email: string) {
	return await User.findOne({ email }).lean();
}

export async function saveUserOtp(id: string, otp: string) {
	return await User.findOneAndUpdate({ _id: id }, { otp }, { new: true }).lean();
}

export async function removeUserOtpAndEnableUser(id: string) {
	return await User.findOneAndUpdate(
		{ _id: id },
		{ otp: null, emailVerified: true, enabled: true }
	).lean();
}

export async function verifyOtp(otp: string, userId: string) {
	return await User.findOne({ _id: userId, otp }).lean();
}
