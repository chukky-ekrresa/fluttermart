import { Document, model, Schema, Types } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

import { IShop } from '../types';
import { User } from './user';

const shopSchema = new Schema(
	{
		address: { type: String, required: true },
		country: { type: String, required: true },
		dispatchRider: { type: Types.ObjectId, ref: User, required: true },
		email: { type: String, required: true, unique: true },
		emailVerified: { type: Boolean, default: false },
		enabled: { type: Boolean, default: false },
		name: {
			type: String,
			required: true,
			unique: true,
		},
		owner: { type: Types.ObjectId, required: true, ref: User },
		phoneNumber: { type: String, default: null },
		phoneNumberVerified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

shopSchema.plugin(mongooseLeanId);

export const Shop = model<IShop & Document>('Shop', shopSchema);
