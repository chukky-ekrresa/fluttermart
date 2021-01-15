import { Document, model, Schema } from 'mongoose';

export interface ITestBankAccount {
	accNumber: string;
	type: string;
}

const bankAccountSchema = new Schema(
	{
		accNumber: String,
		type: String,
	},
	{ collection: 'test_bank_accounts', timestamps: true }
);

export const TestBankAccount = model<ITestBankAccount & Document>(
	'TestBankAccount',
	bankAccountSchema
);
