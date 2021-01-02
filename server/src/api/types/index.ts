export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean | number;
	enabled?: boolean;
	password: string;
	phoneNumber: string;
	phoneNumberVerified: boolean | number;
	role: 'customer' | 'vendor' | 'dispatch';
	lastLogin?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IShop {
	address: string;
	dispatchRider: string;
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
