import { customAlphabet } from 'nanoid';

export function generateOrderCode() {
	const prefix = 'ORD';
	const code = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7)();

	return prefix + '—' + code;
}
