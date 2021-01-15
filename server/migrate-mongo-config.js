// In this file you can configure migrate-mongo
const url = require('url');
const environmentVariables = require('./dist/config/env').default;

const { pathname } = url.parse(environmentVariables.DATABASE_URL);
const databaseName = pathname.substring(1);

const config = {
	mongodb: {
		url: environmentVariables.DATABASE_URL,
		databaseName,

		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
			//   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
		},
	},

	migrationsDir: 'migrations',
	changelogCollectionName: 'changelog',
	migrationFileExtension: '.js',
};

module.exports = config;
