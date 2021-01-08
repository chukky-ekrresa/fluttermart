import { Model } from 'mongoose';

export async function foreignKeyValidator(model: Model<any>, id: any) {
	return model.findOne({ _id: id });
}
