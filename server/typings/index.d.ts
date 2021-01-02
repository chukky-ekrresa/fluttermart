declare namespace NodeJS {
	export interface ProcessEnv {
		ACCESS_TOKEN_SECRET: string;
		DATABASE_TEST_URL: string;
		DATABASE_URL: string;
		NODE_ENV: 'development' | 'production' | 'test';
		PORT: string;
	}
}
