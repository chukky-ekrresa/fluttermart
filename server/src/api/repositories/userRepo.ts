import { User } from '../models/user';

import { IUser } from '../types';

export async function createUser(newUser: IUser) {
	return await User.create(newUser);
}

export async function getUserByEmail(email: string) {
	return await User.findOne({ email }).lean();
}

export async function saveUserOtp(id: string, otp: string) {
	return await User.findOneAndUpdate({ id }, { otp }).lean();
}

export async function removeUserOtp(id: string) {
	return await User.findOneAndUpdate({ id }, { otp: null }).lean();
}
