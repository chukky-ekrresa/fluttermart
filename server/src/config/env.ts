import dotenv from 'dotenv';
import { Joi } from 'celebrate';
import { logger } from './logger';

dotenv.config();

const envVarsSchema = Joi.object({
	ACCESS_TOKEN_SECRET: Joi.string().required(),
	CLOUDINARY_URL: Joi.string().when('NODE_ENV', {
		is: Joi.string().equal('production', 'development'),
		then: Joi.required(),
		otherwise: Joi.optional(),
	}),
	DATABASE_URL: Joi.string().required(),
	FLW_PUBLIC_KEY: Joi.string().when('NODE_ENV', {
		is: Joi.string().equal('production', 'development'),
		then: Joi.required(),
		otherwise: Joi.optional(),
	}),
	FLW_SECRET_KEY: Joi.string().when('NODE_ENV', {
		is: Joi.string().equal('production', 'development'),
		then: Joi.required(),
		otherwise: Joi.optional(),
	}),
	MAIL_SENDER: Joi.string().when('NODE_ENV', {
		is: Joi.string().equal('production', 'development'),
		then: Joi.required(),
		otherwise: Joi.optional(),
	}),
	MJ_APIKEY_PUBLIC: Joi.string().when('NODE_ENV', {
		is: Joi.string().equal('production', 'development'),
		then: Joi.required(),
		otherwise: Joi.optional(),
	}),
	MJ_APIKEY_PRIVATE: Joi.string().when('NODE_ENV', {
		is: Joi.string().equal('production', 'development'),
		then: Joi.required(),
		otherwise: Joi.optional(),
	}),
	NODE_ENV: Joi.string(),
	PORT: Joi.string(),
});

const { error, value } = envVarsSchema.validate(process.env, {
	abortEarly: false,
	allowUnknown: true,
}) as { error: Error; value: NodeJS.ProcessEnv };

if (error) {
	logger.error(error.message);
	process.exit(1);
}

export default value;
