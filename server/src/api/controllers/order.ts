import { Request } from 'express';

import * as OrderService from '../services/order';
import { ApiResponse } from '../types';

export async function createOrderHandler(req: Request, res: ApiResponse) {
	const order = await OrderService.createOrder(req.body);
	res.status(201).json({ status: 201, message: 'Order was successful!', data: order });
}

export async function cancelOrderHandler(req: Request, res: ApiResponse) {
	const order = (await OrderService.cancelOrder(req.params.orderId)) as any;
	res.status(200).json({ status: 200, message: 'Order was cancelled!', data: order });
}

export async function getCustomerOrdersHandler(_req: Request, res: ApiResponse) {
	const orders = await OrderService.getCustomerOrders();
	res.status(201).json({ status: 201, message: 'Order was successful!', data: orders });
}
