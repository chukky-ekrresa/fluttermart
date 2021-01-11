import { User } from '../models/user';
import { IUser } from '../types';

export async function createUser(newUser: IUser) {
	return await User.create(newUser);
}

export async function getUserByEmail(email: string) {
	return await User.findOne({ email }).lean({ virtuals: true });
}

export async function getUserById(userId: string) {
	return await User.findOne({ _id: userId }).lean({ virtuals: true });
}

export async function saveUserOtp(otp: string, userId: string) {
	return await User.findOneAndUpdate({ _id: userId }, { otp }, { new: true }).lean({
		virtuals: true,
	});
}

export async function removeUserOtpAndEnableUser(userId: string) {
	return await User.findOneAndUpdate(
		{ _id: userId },
		{ otp: null, emailVerified: true, enabled: true }
	).lean({ virtuals: true });
}

export async function verifyOtp(otp: string, userId: string) {
	return await User.findOne({ _id: userId, otp }).lean({ virtuals: true });
}
