import { TestBankAccount } from '../models/testBankAccount';

export async function getDefaultTestAccountNumber() {
	return await TestBankAccount.findOne({ type: 'default' });
}

export async function incrementTestAccountNumber() {
	const account = await getDefaultTestAccountNumber();
	const newAccountNumber = Number(account!.accNumber) + 1;

	await TestBankAccount.findOneAndUpdate(
		{ type: 'default' },
		{ accNumber: `0${newAccountNumber}` }
	).exec();
}
