import { addMinutes } from 'date-fns';
import { BadRequest, NotFound } from 'http-errors';

import * as OrderRepo from '../repositories/orderRepo';
import flw from '../../config/flutterwave';
import { generateOrderCode } from '../helpers/orderCode';
import { getLoggedInUser } from '../helpers/requestSession';
import { IOrder } from '../types';
import { agendaInstance } from '../../config/agenda';

export async function cancelOrder(orderId: string) {
	const order = await OrderRepo.getOrderById(orderId);

	if (!order) {
		throw new NotFound('Order does not exist');
	}

	if (order.status !== 'confirmed') {
		throw new BadRequest('Order cannot be cancelled because order has been shipped');
	}

	const loggedInUser = getLoggedInUser();
	const cancelledOrder = await OrderRepo.cancelOrder(orderId);

	agendaInstance.now('change_order_status_cancelled', {
		orderId,
		amount: order.total,
		email: loggedInUser.email,
		transactionId: order.transactionId,
		transactionRef: order.transactionRef,
	});

	return cancelledOrder;
}

export async function createOrder(newOrder: IOrder) {
	await validateOrderPayment(newOrder.transactionId, newOrder.transactionRef);
	const loggedInUser = getLoggedInUser();

	newOrder.orderCode = generateOrderCode();
	newOrder.status = 'confirmed';
	newOrder.customer = loggedInUser.id!;

	const order = await OrderRepo.saveOrder(newOrder);

	agendaInstance.now('send email', {
		html: `<h2>Payment confirmed. We will deliver your order ${newOrder.orderCode} in thirty minutes</h2>`,
		to: loggedInUser.email,
		subject: 'Order Confirmed',
	});

	agendaInstance.schedule(addMinutes(new Date(), 15), 'change_order_status_shipped', {
		orderId: order._id,
		email: loggedInUser.email,
	});

	return order;
}

export async function deliverOrder(orderId: string) {
	const order = await OrderRepo.getOrderById(orderId);

	if (!order) {
		throw new NotFound('Order does not exist');
	}

	if (order.status !== 'shipped') {
		throw new BadRequest(
			`Order cannot be delivered because current status of order is ${order.status}`
		);
	}

	return await OrderRepo.deliverOrder(orderId);
}

export async function getCustomerOrders() {
	const loggedInUser = getLoggedInUser();

	return await OrderRepo.getCustomerOrders(loggedInUser.id!);
}

export async function shipOrder(orderId: string) {
	const order = await OrderRepo.getOrderById(orderId);

	if (!order) {
		throw new NotFound('Order does not exist');
	}

	if (order.status !== 'confirmed') {
		throw new BadRequest(
			`Order cannot be shipped because current status of order is ${order.status}`
		);
	}

	return await OrderRepo.shipOrder(orderId);
}

async function validateOrderPayment(transactionId: string, transactionRef: string) {
	const response = await flw.Transaction.verify({ id: transactionId });

	if (response.status === 'success' && response.data.tx_ref === transactionRef) {
		return;
	}

	throw new BadRequest('Shop payment was not successful');
}
