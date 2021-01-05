import { Document, model, Schema } from 'mongoose';

import { IUser } from '../types';

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
		},
		emailVerified: { type: Boolean, default: false },
		enabled: { type: Boolean, default: false },
		lastLogin: { type: Date, default: null },
		otp: { type: String, default: null },
		phoneNumber: { type: String, default: null },
		phoneNumberVerified: { type: Boolean, default: false },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['customer', 'dispatch', 'vendor'],
			default: 'customer',
		},
	},
	{ timestamps: true }
);

export const User = model<IUser & Document>('User', userSchema);
