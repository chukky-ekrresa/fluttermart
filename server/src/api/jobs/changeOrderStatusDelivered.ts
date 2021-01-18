import { Job } from 'agenda';

import { logger } from '../../config/logger';
import { deliverOrder } from '../services/order';

export function changeOrderStatusDelivered(agenda: any) {
	agenda.define('change_order_status_delivered', { priority: 'highest' }, async (job: Job) => {
		const input = job.attrs.data;

		try {
			await deliverOrder(input.orderId);

			agenda.now('send email', {
				html: `<h2>Your order has been delivered. Thanks for shopping with Jumga.</h2>`,
				to: input.email,
				subject: 'Order Shipped',
			});
		} catch (error) {
			logger.error(error.message);
		}
	});
}
