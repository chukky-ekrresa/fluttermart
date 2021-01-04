import { Response } from 'express';

export interface IUser {
	email: string;
	emailVerified: boolean | number;
	enabled: boolean;
	firstName: string;
	id: string;
	lastLogin?: Date;
	lastName: string;
	otp: string | null;
	password: string;
	phoneNumber: string;
	phoneNumberVerified: boolean | number;
	role: 'customer' | 'vendor' | 'dispatch';
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IShop {
	address: string;
	dispatchRider: string;
	enabled: string;
	name: string;
	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrder {
	address: string;
	customerId: string;
	products: IProduct[];
	shopId: string;
	total: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProduct {
	description: string;
	name: string;
	price: string;
	shopId: string;
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
