import cloudinary, { UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';

import { UploadParams } from '../types';
import { logger } from '../../config/logger';

export async function uploadImage(uploadParams: UploadParams): Promise<UploadApiResponse> {
	const { filename, image, shop } = uploadParams;

	return await new Promise((resolve, reject) => {
		const stream = cloudinary.v2.uploader.upload_stream(
			{ folder: 'fluttermart/' + shop, public_id: filename },
			(error, result) => {
				if (result) {
					resolve(result);
				} else {
					logger.error(error);
					reject(error);
				}
			}
		);

		streamifier.createReadStream(image).pipe(stream);
	});
}
