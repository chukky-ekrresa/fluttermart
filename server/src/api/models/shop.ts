import { Document, model, Schema, Types } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

import { IShop } from '../types';
import { User } from './user';

const shopSchema = new Schema(
	{
		approved: { type: Boolean, default: false },
		account: new Schema(
			{
				account_bank: String,
				account_id: Number,
				account_number: String,
				subaccount_id: String,
				split_value: Number,
				meta: {},
			},
			{ timestamps: true }
		),
		address: { type: String, required: true },
		country: { type: String, required: true },
		dispatchRider: { type: Types.ObjectId, ref: User, required: true },
		email: { type: String, required: true },
		emailVerified: { type: Boolean, default: false },
		image: new Schema(
			{
				url: { type: String },
				publicId: { type: String },
			},
			{ timestamps: false }
		),
		name: {
			type: String,
			required: true,
			unique: true,
		},
		owner: { type: Types.ObjectId, required: true, ref: User },
		phoneNumber: { type: String, default: null },
		phoneNumberVerified: { type: Boolean, default: false },
		transactionId: { type: String, required: true },
		transactionRef: { type: String, required: true },
	},
	{ timestamps: true }
);

shopSchema.plugin(mongooseLeanId);

export const Shop = model<IShop & Document>('Shop', shopSchema);
