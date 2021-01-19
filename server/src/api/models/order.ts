import { Document, model, Schema, Types } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

import { IOrder } from '../types';
import { Product } from './product';
import { Shop } from './shop';
import { User } from './user';

const orderProductSchema = new Schema(
	{
		category: { type: String, default: 'other' },
		colour: { type: String, default: null },
		image: new Schema(
			{
				url: { type: String },
				publicId: { type: String },
			},
			{ timestamps: false }
		),
		name: { type: String, required: true },
		price: { type: Number, required: true },
		id: { type: Types.ObjectId, ref: Product },
		quantity: { type: Number, required: true },
		size: { type: String, default: null },
	},
	{ timestamps: true }
);

const orderSchema = new Schema(
	{
		address: { type: String, required: true },
		country: { type: String, required: true },
		customer: { type: Types.ObjectId, ref: User, required: true },
		deliveryFee: { type: Number, required: true },
		orderCode: { type: String, required: true },
		notes: { type: String, default: null },
		products: [orderProductSchema],
		shop: { type: Types.ObjectId, ref: Shop },
		status: { type: String, enum: ['unconfirmed', 'confirmed', 'shipped', 'delivered'] },
		total: { type: Number, required: true },
		transactionId: { type: String, required: true },
		transactionRef: { type: String, required: true },
	},
	{ timestamps: true }
);

orderSchema.plugin(mongooseLeanId);

export const Order = model<IOrder & Document>('Order', orderSchema);
