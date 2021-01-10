import { Document, model, Schema, Types } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

import { IProduct } from '../types';
import { User } from './user';
import { Shop } from './shop';
import { foreignKeyValidator } from '../helpers/foreignKeyValidator';

const productSchema = new Schema(
	{
		colour: { type: String, default: null },
		discount: { type: Number, default: 0 },
		image: new Schema(
			{
				url: { type: String },
				publicId: { type: String },
			},
			{ timestamps: false }
		),
		name: { type: String, required: true },
		owner: { type: Types.ObjectId, ref: User, required: true },
		price: { type: Number, set: setPrice, required: true },
		quantity: { type: Number, default: 0 },
		shop: {
			type: Types.ObjectId,
			ref: Shop,
			validate: {
				validator: function (v: any) {
					return foreignKeyValidator(Shop, v);
				},
				message: 'the shop provided does not exist',
			},
			required: true,
		},
		size: { type: String, default: null },
		sku: { type: String, required: true },
		summary: { type: String },
	},
	{ timestamps: true, toJSON: { getters: true } }
);

productSchema.virtual('original_price').get(function (this: IProduct) {
	return parseFloat((this.price / 100).toFixed(2));
});

productSchema.virtual('normalized_price').get(function (this: IProduct) {
	return parseFloat(((this.price / 100) * (1 - this.discount)).toFixed(2));
});

productSchema.plugin(mongooseLeanId);
productSchema.plugin(mongooseLeanVirtuals);

export const Product = model<IProduct & Document>('Product', productSchema);

function setPrice(num: number) {
	return num * 100;
}
