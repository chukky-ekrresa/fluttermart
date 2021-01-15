module.exports = {
	async up(db) {
		return await db
			.collection('test_bank_accounts')
			.insertOne({ accNumber: '0690000021', type: 'default' });
	},

	async down(db) {
		return await db.collection('test_bank_accounts').drop();
	},
};
