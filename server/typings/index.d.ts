declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		PORT: string;
		DATABASE_URL: string;
		DATABASE_TEST_URL: string;
	}
}
