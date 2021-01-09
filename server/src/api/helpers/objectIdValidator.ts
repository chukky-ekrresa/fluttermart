import { Types } from 'mongoose';
import { CustomHelpers } from '@hapi/joi';

export function isValidObjectId(value: any) {
	// If value is an object (ObjectId) cast it to a string
	const objectIdString = typeof value === 'string' ? value : String(value);

	// Cast the string to ObjectId
	const objectIdInstance = new Types.ObjectId(objectIdString);

	return String(objectIdInstance) === objectIdString;
}

export function joiValidateObjectId(value: string, helper: CustomHelpers) {
	const isValid = isValidObjectId(value);

	if (!isValid) {
		return helper.error('any.invalid');
	}

	return value;
}
