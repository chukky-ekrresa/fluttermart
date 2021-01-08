import { Document, model, Schema } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

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

userSchema.plugin(mongooseLeanId);

export const User = model<IUser & Document>('User', userSchema);
