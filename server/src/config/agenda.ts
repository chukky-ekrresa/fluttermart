import Agenda from 'agenda';
import { addMinutes } from 'date-fns';

import ENV_VARS from './env';
import flw from './flutterwave';
import { logger } from './logger';
import { sendEmail, IEmailInput } from './email';
import * as TestBankAccountRepo from '../api/repositories/testBankAccountRepo';

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

agendaInstance.define('create_subaccount_shop', { priority: 'highest' }, async job => {
	const input = job.attrs.data;
	const testBankAccount = await TestBankAccountRepo.getDefaultTestAccountNumber();

	const payload = {
		account_bank: '044',
		account_number: testBankAccount!.accNumber,
		business_name: input.name,
		business_email: input.email,
		business_contact: input.email,
		business_mobile: input.phoneNumber,
		business_contact_mobile: input.phoneNumber,
		country: input.country,
		meta: [
			{
				meta_name: 'shopId',
				meta_value: input._id,
			},
		],
		split_type: 'percentage',
		split_value: 0.025,
	};

	try {
		await flw.Subaccount.create(payload);
	} catch (error) {
		logger.error(error.message);
	}

	await TestBankAccountRepo.incrementTestAccountNumber();
});

agendaInstance.define('create_subaccount_dispatch', { priority: 'high' }, async job => {
	const input = job.attrs.data;
	const testBankAccount = await TestBankAccountRepo.getDefaultTestAccountNumber();

	const payload = {
		account_bank: '044',
		account_number: testBankAccount!.accNumber,
		business_name: input.firstName + ' ' + input.lastName,
		business_email: input.email,
		business_contact: input.firstName,
		business_mobile: input.phoneNumber,
		business_contact_mobile: input.phoneNumber,
		country: input.country,
		meta: [
			{
				meta_name: 'driverId',
				meta_value: input._id,
			},
			{
				meta_name: 'shopId',
				meta_value: input.shopId,
			},
		],
		split_type: 'percentage',
		split_value: 0.2,
	};

	try {
		await flw.Subaccount.create(payload);
	} catch (error) {
		logger.error(error.message);
	}

	await TestBankAccountRepo.incrementTestAccountNumber();
});

export async function gracefulShutdown() {
	await agendaInstance.stop();
	process.exit(0);
}

(async () => {
	await agendaInstance.start();
})();
