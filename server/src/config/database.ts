import mongoose from 'mongoose';

import ENV_VARS from './env';
import { logger } from './logger';

export async function initialiseDatabase() {
	const MONGODB_URL: string =
		ENV_VARS.NODE_ENV === 'test' ? ENV_VARS.DATABASE_TEST_URL : ENV_VARS.DATABASE_URL;

	try {
		await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
			poolSize: 8,
		});
		mongoDBConnected();
	} catch (error) {
		mongoDBError(error);
	}

	mongoose.connection.on('disconnected', mongoDBDisconnected);
	mongoose.connection.on('error', mongoDBError);
}

export async function disconnectDB() {
	await mongoose.connection.db.dropDatabase();
	await mongoose.connection.close();

	logger.info('connection closed');
}

function mongoDBConnected() {
	logger.info('connected to MongoDB');
}

function mongoDBDisconnected() {
	logger.info('MongoDB disconnected');
}

function mongoDBError(err: typeof mongoDBError) {
	logger.error('MongoDB Error: ', err);
	process.exit(1);
}
