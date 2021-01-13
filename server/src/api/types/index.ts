import { Response } from 'express';

export interface IUser {
	email: string;
	emailVerified: boolean;
	enabled: boolean;
	firstName: string;
	id?: string;
	lastName: string;
	otp?: string | null;
	password: string;
	phoneNumber: string;
	phoneNumberVerified: boolean;
	role: Role;
	createdAt?: Date;
	updatedAt?: Date;
}

type Role = 'customer' | 'vendor' | 'dispatch';

export interface IShop {
	address: string;
	approved: boolean;
	country: string;
	dispatchRider: IUser | string;
	email: string;
	emailVerified: boolean;
	id: string;
	name: string;
	owner: IUser | string;
	phoneNumber: string;
	phoneNumberVerified: boolean;
	transactionId: string;
	transactionRef: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrder {
	address: string;
	country: string;
	customer: IUser | string;
	deliveryFee: number;
	dispatchRider: IUser;
	notes?: string;
	orderCode: string;
	paymentRef: string;
	products: IProduct[];
	status: 'unconfirmed' | 'shipped' | 'delivered';
	total: string;
	transactionId: string;
	transactionRef: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProduct {
	category: string;
	colour?: string;
	discount: number;
	image: { url: string; publicId: string };
	name: string;
	price: number;
	quantity: number;
	shop: IShop | string;
	size?: string;
	sku: string;
	summary: string;
	createdAt: Date;
	updatedAt: Date;
}

export type ApiResponse = TypedResponse<{
	data?: any[] | Record<string, any> | string;
	message: string;
	status: number;
}>;

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
	json(data: T): TypedResponse<T>;
} & { status(code: number): TypedResponse<T> };

export type UploadParams = { image: Buffer; filename: string; shop: string };
