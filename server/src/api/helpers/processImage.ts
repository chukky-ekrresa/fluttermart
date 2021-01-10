import sharp from 'sharp';

export async function processImage(img: any) {
	return await sharp(img.buffer).resize(500, 500).jpeg().toBuffer();
}
