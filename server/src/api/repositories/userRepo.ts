import { User } from '../models/user';
import { IAccount, IUser } from '../types';

export async function createUser(newUser: IUser) {
	return await User.create(newUser).then(user => user.toObject());
}

export async function getUserByEmail(email: string) {
	return await User.findOne({ email }).select('-account').lean();
}

export async function getUserById(userId: string) {
	return await User.findOne({ _id: userId }).lean();
}

export async function saveUserOtp(otp: string, userId: string) {
	return await User.findOneAndUpdate({ _id: userId }, { otp }, { new: true })
		.select('-account')
		.lean();
}

export async function removeUserOtpAndEnableUser(userId: string) {
	return await User.findOneAndUpdate(
		{ _id: userId },
		{ otp: null, emailVerified: true, enabled: true }
	)
		.select('-account')
		.lean();
}

export async function verifyOtp(otp: string, userId: string) {
	return await User.findOne({ _id: userId, otp }).select('-account').lean();
}

export async function updateUserAccount(userId: string, accountInfo: IAccount) {
	return await User.findOneAndUpdate({ _id: userId }, { account: { ...accountInfo } }).lean();
}
