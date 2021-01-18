import { Job } from 'agenda';

import * as TestBankAccountRepo from '../repositories/testBankAccountRepo';
import flw from '../../config/flutterwave';
import { updateShopAccount } from '../repositories/shopRepo';
import { logger } from '../../config/logger';

export function createShopSubaccountJob(agenda: any) {
	agenda.define('create_subaccount_shop', { priority: 'highest' }, async (job: Job) => {
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
			const response = await flw.Subaccount.create(payload);

			await updateShopAccount(input._id, response.data);
		} catch (error) {
			logger.error(error.message);
		}

		await TestBankAccountRepo.incrementTestAccountNumber();
	});
}
