import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { BadRequest } from 'http-errors';

export const imageMiddleware = [
	uploadMiddleware,
	function (req: Request, _res: Response, next: NextFunction) {
		if (!req.file) {
			throw new BadRequest('An image is required');
		}

		next();
	},
];

async function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		await new Promise<void>((resolve, reject) => {
			multer().single('image')(req, res, (error: any) => {
				if (error) reject(error);

				resolve();
			});
		});

		next();
	} catch (error) {
		next(error);
	}
}
