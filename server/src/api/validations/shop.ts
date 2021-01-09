import { Joi, Segments } from 'celebrate';

export const NEW_SHOP = {
	[Segments.BODY]: Joi.object().keys({
		address: Joi.string().trim().required(),
		country: Joi.string().trim().required(),
		email: Joi.string().trim().email().lowercase().required(),
		name: Joi.string().trim().required(),
		phoneNumber: Joi.string().trim().required(),
	}),
};

export const UPDATE_SHOP = {
	[Segments.BODY]: Joi.object().keys({
		address: Joi.string().trim().required(),
		country: Joi.string().trim().required(),
		email: Joi.string().trim().email().lowercase().required(),
		name: Joi.string().trim().required(),
		phoneNumber: Joi.string().trim().required(),
	}),
};
