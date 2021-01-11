import Agenda from 'agenda';
import { addMinutes } from 'date-fns';

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

export async function gracefulShutdown() {
	await agendaInstance.stop();
	process.exit(0);
}

agendaInstance.define('send user verification email', { priority: 'highest' }, async job => {
	const emailInput = job.attrs.data as IEmailInput;

	try {
		return await sendEmail(emailInput);
	} catch (error) {
		if (!job.attrs.failCount) {
			job.attrs.failCount = 1;
		} else {
			job.attrs.failCount++;
		}

		if (job.attrs.failCount < 5) {
			job.attrs.nextRunAt = addMinutes(new Date(), 5);
		} else {
			job.attrs.failedAt = new Date();
		}

		return await job.save();
	}
});

(async () => {
	await agendaInstance.start();
})();
