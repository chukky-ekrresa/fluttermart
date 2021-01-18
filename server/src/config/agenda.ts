import Agenda from 'agenda';

import ENV_VARS from './env';
import { sendEmailJob } from '../api/jobs/sendEmail';
import { createShopSubaccountJob } from '../api/jobs/createShopSubaccount';
import { createDispatchSubaccountJob } from '../api/jobs/createDispatchSubaccount';
import { changeOrderStatusDelivered } from '../api/jobs/changeOrderStatusDelivered';
import { changeOrderStatusShipped } from '../api/jobs/changeOrderStatusShipped';
import { logger } from './logger';

export const agendaInstance = new Agenda({
	db: {
		address: ENV_VARS.DATABASE_URL,
		collection: 'jobs',
		options: { useNewUrlParser: true, useUnifiedTopology: true },
	},
	processEvery: '5 seconds',
	maxConcurrency: 20,
	defaultConcurrency: 5,
	lockLimit: 0,
});

agendaInstance.on('ready', () => logger.info('Agenda is ready to process jobs'));
agendaInstance.on('error', () => logger.debug('something is wrong with Agenda'));

sendEmailJob(agendaInstance);
createShopSubaccountJob(agendaInstance);
createDispatchSubaccountJob(agendaInstance);
changeOrderStatusDelivered(agendaInstance);
changeOrderStatusShipped(agendaInstance);

export async function gracefulShutdown() {
	await agendaInstance.stop();
	process.exit(0);
}

(async () => {
	await agendaInstance.start();
})();
