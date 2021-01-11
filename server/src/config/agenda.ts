import Agenda from 'agenda';

import ENV_VARS from './env';
import { logger } from './logger';
import { sendEmail, IEmailInput } from './email';

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

agendaInstance.define('send user verification email', { priority: 'highest' }, async job => {
	const emailInput = job.attrs.data as IEmailInput;

	return await sendEmail(emailInput);
});

(async () => {
	await agendaInstance.start();
})();
