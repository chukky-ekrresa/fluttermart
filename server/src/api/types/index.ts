import { Response } from 'express';

export interface IUser {
	email: string;
	emailVerified: boolean | number;
	enabled: boolean;
	firstName: string;
	id?: string;
	lastName: string;
	otp?: string | null;
	password: string;
	phoneNumber: string;
	phoneNumberVerified: boolean | number;
	role: Role;
	createdAt?: Date;
	updatedAt?: Date;
}

type Role = 'customer' | 'vendor' | 'dispatch';

export interface IShop {
	address: string;
	country: string;
	dispatchRider: IUser | string;
	enabled: string;
	id: string;
	name: string;
	owner: IUser | string;
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
	colour?: string;
	discount: number;
	name: string;
	owner: string;
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
