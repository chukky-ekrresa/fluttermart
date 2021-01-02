import { Joi, Segments } from 'celebrate';

export const REGISTER = {
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().lowercase().trim().max(255).required(),
		firstName: Joi.string().lowercase().min(2).max(255).trim().required(),
		lastName: Joi.string().lowercase().min(2).max(255).trim().required(),
		password: Joi.string().max(255).required(),
		role: Joi.string().valid('customer', 'vendor').default('customer'),
	}),
};

export const LOGIN = {
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().lowercase().trim().max(255).required(),
		password: Joi.string().min(6).max(100).required(),
	}),
};
