import { Job } from 'agenda';
import { addMinutes } from 'date-fns';

import { logger } from '../../config/logger';
import { shipOrder } from '../services/order';

export function changeOrderStatusShipped(agenda: any) {
	agenda.define('change_order_status_shipped', { priority: 'highest' }, async (job: Job) => {
		const input = job.attrs.data;

		try {
			await shipOrder(input.orderId);

			agenda.now('send email', {
				html: `<h2>Your order has been shipped. We will deliver your order in fifteen minutes</h2>`,
				to: input.email,
				subject: 'Order Shipped',
			});

			// schedule order to be delivered in 15mins
			agenda.schedule(addMinutes(new Date(), 15), 'change_order_status_delivered', {
				orderId: input.orderId,
				email: input.email,
			});
		} catch (error) {
			logger.error(error.message);
		}
	});
}
