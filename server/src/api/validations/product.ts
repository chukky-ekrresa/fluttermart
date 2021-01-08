import { Joi, Segments } from 'celebrate';

export const NEW_PRODUCT = {
	[Segments.BODY]: Joi.object().keys({
		colour: Joi.string(),
		discount: Joi.string().regex(/^\s*-?0{1}(\.\d{2})?\s*$/),
		name: Joi.string().required(),
		price: Joi.string()
			.regex(/^\s*-?\d+(\.\d{2})?\s*$/)
			.required(),
		quantity: Joi.number().positive().min(0).required(),
		size: Joi.string(),
		summary: Joi.string(),
	}),
};
