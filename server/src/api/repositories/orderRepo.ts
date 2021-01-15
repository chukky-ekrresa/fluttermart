import { Order } from '../models/order';
import { IOrder } from '../types';

export async function getCustomerOrders(customerId: string) {
	return await Order.find({ customer: customerId }).lean();
}

export async function getOrderById(orderId: string) {
	return await Order.findOne({ _id: orderId }).populate('customer', '-password').lean();
}

export async function saveOrder(order: IOrder) {
	return await Order.create(order);
}
