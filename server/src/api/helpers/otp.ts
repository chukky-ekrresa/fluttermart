import { customAlphabet } from 'nanoid/async';

export async function generateOTP() {
	const base = '0123456789';
	const nanoid = customAlphabet(base, 6);
	return (await nanoid()).toUpperCase();
}
