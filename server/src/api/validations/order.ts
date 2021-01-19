import { Joi, Segments } from 'celebrate';

import { joiValidateObjectId } from '../helpers/objectIdValidator';

export const NEW_ORDER = {
	[Segments.BODY]: Joi.object().keys({
		address: Joi.string().trim().required(),
		country: Joi.string().trim().required(),
		deliveryFee: Joi.number().required(),
		notes: Joi.string().allow(''),
		products: Joi.array()
			.items(
				Joi.object().keys({
					category: Joi.string().default('other'),
					id: Joi.string()
						.trim()
						//@ts-expect-error
						.custom(joiValidateObjectId)
						.message('value does not match the pattern of an objectId')
						.required(),
					image: Joi.object()
						.keys({
							url: Joi.string().required(),
							publicId: Joi.string().required(),
						})
						.required(),
					name: Joi.string().required(),
					price: Joi.number().required(),
					quantity: Joi.number().required(),
				})
			)
			.required(),
		shop: Joi.string()
			.trim()
			//@ts-expect-error
			.custom(joiValidateObjectId)
			.required(),
		total: Joi.number().required(),
		transactionId: Joi.number().required(),
		transactionRef: Joi.number().required(),
	}),
};

export const ORDER_PARAMS = {
	[Segments.PARAMS]: Joi.object().keys({
		orderId: Joi.string()
			.trim()
			//@ts-expect-error
			.custom(joiValidateObjectId)
			.message('value does not match the pattern of an objectId')
			.required(),
	}),
};
