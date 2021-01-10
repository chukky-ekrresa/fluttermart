declare namespace NodeJS {
	export interface ProcessEnv {
		ACCESS_TOKEN_SECRET: string;
		CLOUDINARY_URL: string;
		DATABASE_TEST_URL: string;
		DATABASE_URL: string;
		MAIL_SENDER: string;
		MJ_APIKEY_PUBLIC: string;
		MJ_APIKEY_PRIVATE: string;
		NODE_ENV: 'development' | 'production' | 'test';
		PORT: string;
	}
}

declare module 'mongoose-lean-id';
declare module 'streamifier';
