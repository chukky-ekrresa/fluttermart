import dotenv from 'dotenv';
import { Joi } from 'celebrate';
import { logger } from './logger';

dotenv.config();

type EnvConfig = NodeJS.ProcessEnv;

const envVarsSchema = Joi.object({
	DATABASE_URL: Joi.string().required(),
	NODE_ENV: Joi.string(),
	PORT: Joi.string(),
	BASE_URL: Joi.string(),
});

const { error, value } = envVarsSchema.validate(process.env, {
	abortEarly: false,
	allowUnknown: true,
}) as { error: Error; value: EnvConfig };

if (error) {
	logger.error(error.message);
	process.exit(1);
}

export default value;
