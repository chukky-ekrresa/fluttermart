import { Job } from 'agenda';

import * as TestBankAccountRepo from '../repositories/testBankAccountRepo';
import flw from '../../config/flutterwave';
import { updateUserAccount } from '../repositories/userRepo';
import { logger } from '../../config/logger';

export function createDispatchSubaccountJob(agenda: any) {
	agenda.define('create_subaccount_dispatch', { priority: 'high' }, async (job: Job) => {
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
			const response = await flw.Subaccount.create(payload);

			await updateUserAccount(input._id, response.data);
		} catch (error) {
			logger.error(error.message);
		}

		await TestBankAccountRepo.incrementTestAccountNumber();
	});
}
