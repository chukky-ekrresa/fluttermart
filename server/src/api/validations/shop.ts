import { Joi, Segments } from 'celebrate';

export const NEW_SHOP = {
	[Segments.BODY]: Joi.object().keys({
		address: Joi.string().required(),
		country: Joi.string().required(),
		email: Joi.string().email().required(),
		name: Joi.string().required(),
		phoneNumber: Joi.string().required(),
	}),
};

export const UPDATE_SHOP = {
	[Segments.BODY]: Joi.object().keys({
		address: Joi.string().required(),
		country: Joi.string().required(),
		email: Joi.string().email().required(),
		name: Joi.string().required(),
		phoneNumber: Joi.string().required(),
	}),
};
