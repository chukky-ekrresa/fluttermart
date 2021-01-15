import { Joi, Segments } from 'celebrate';

import { joiValidateObjectId } from '../helpers/objectIdValidator';

export const NEW_ORDER = {
	[Segments.BODY]: Joi.object().keys({
		address: Joi.string().trim().required(),
		country: Joi.string().trim().required(),
		deliveryFee: Joi.number().required(),
		notes: Joi.string(),
		products: Joi.array()
			.items(
				Joi.object().keys({
					category: Joi.string().default('other'),
					colour: Joi.string(),
					image: Joi.object()
						.keys({
							url: Joi.string().required(),
							publicId: Joi.string().required(),
						})
						.required(),
					name: Joi.string().required(),
					price: Joi.number().required(),
					productId: Joi.string()
						.trim()
						//@ts-expect-error
						.custom(joiValidateObjectId)
						.message('value does not match the pattern of an objectId')
						.required(),
					quantity: Joi.number().required(),
					shop: Joi.string()
						.trim()
						//@ts-expect-error
						.custom(joiValidateObjectId)
						.message('value does not match the pattern of an objectId')
						.required(),
					size: Joi.string(),
				})
			)
			.required(),
		total: Joi.number().required(),
		transactionId: Joi.number().required(),
		transactionRef: Joi.number().required(),
	}),
};
