import { Joi, Segments } from 'celebrate';

export const NEW_PRODUCT = {
	[Segments.BODY]: Joi.object().keys({
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
		size: Joi.string().trim(),
		summary: Joi.string().trim(),
	}),
};
