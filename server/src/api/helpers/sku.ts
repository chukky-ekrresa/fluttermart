import { customAlphabet } from 'nanoid';

export function generateSKU() {
	const prefix = 'FLM';
	const code = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7)();

	return prefix + '—' + code;
}
