import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { isCelebrateError, CelebrateError } from 'celebrate';
import { logger } from './logger';

export function ErrorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
	const status = 500;
	const message = 'Internal Server Error';

	if (err.name === 'CastError') {
		err.message = 'Invalid ObjectId';
	}

	if (isCelebrateError(err)) {
		const errorObj = buildValidationError(err);
		err = { ...err, ...errorObj };
	}

	logger.error(err);

	return res.status(err.status || status).send({
		...(err?.errors ? { errors: err.errors } : {}),
		message: err.message || message,
		status: err.status || status,
	});
}

function buildValidationError(error: CelebrateError) {
	const status = 400;
	const message = 'Request validation failed';
	const errors = parseJoiErrors(error);

	return { errors, message, status };
}

function parseJoiErrors(errors: CelebrateError) {
	const errorMap: Record<string, any> = {};

	errors.details.forEach(segment => {
		segment.details.forEach(errorDetail => {
			const [key] = errorDetail.path;

			if (key === 'price') {
				errorMap[key] = 'price must be a string containing a number with exactly two decimals';
			} else if (key === 'discount') {
				errorMap[key] =
					'discount must be a string containing a number in the range of 0.00 to 0.99';
			} else {
				errorMap[key] = errorDetail.message.replace(/"/g, '');
			}
		});
	});

	return errorMap;
}
