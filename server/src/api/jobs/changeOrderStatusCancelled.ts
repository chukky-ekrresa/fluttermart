import { Job } from 'agenda';

import { logger } from '../../config/logger';
import flw from '../../config/flutterwave';

export function changeOrderStatusCancelled(agenda: any) {
	agenda.define('change_order_status_cancelled', { priority: 'highest' }, async (job: Job) => {
		const input = job.attrs.data;

		try {
			const payload = {
				id: input.transactionId,
				amount: `${input.amount}`,
			};

			await flw.Transaction.refund(payload);

			agenda.now('send email', {
				html:
					`<h2>Your order has been cancelled. We are processing your refund. ` +
					`Thanks for shopping with Jumga.</h2>`,
				to: input.email,
				subject: 'Order Shipped',
			});
		} catch (error) {
			logger.error(error.message);
		}
	});
}
