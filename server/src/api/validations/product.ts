import { Joi, Segments } from 'celebrate';

import { joiValidateObjectId } from '../helpers/objectIdValidator';

export const NEW_PRODUCT = {
	[Segments.BODY]: Joi.object().keys({
		category: Joi.string().trim().default('other'),
		colour: Joi.string().trim(),
		discount: Joi.string()
			.trim()
			.regex(/^\s*-?0{1}(\.\d{2})?\s*$/),
		name: Joi.string().trim().required(),
		price: Joi.string()
			.trim()
			.regex(/^\s*-?\d+(\.\d{2})?\s*$/)
			.required(),
		quantity: Joi.number().positive().min(0).required(),
		shop: Joi.string()
			//@ts-expect-error
			.custom(joiValidateObjectId)
			.message('value does not match the pattern of an objectId')
			.required(),
		size: Joi.string().trim(),
		summary: Joi.string().trim(),
	}),
};
