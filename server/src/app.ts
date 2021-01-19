import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError from 'http-errors';

import ENV_VARS from './config/env';
import { ErrorHandler } from './config/error';
import { initialiseDatabase } from './config/database';
import { gracefulShutdown } from './config/agenda';
import appRouter from './api/routes';

initialiseDatabase();

const whitelist = ['https://fluttermart.vercel.app', 'http://localhost:3000'];
const corsOptions = {
	origin: function (origin: any, callback: any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

const app = express();

app.use(cors(corsOptions));

// Log requests
app.use(morgan('dev', { skip: () => ENV_VARS.NODE_ENV === 'test' }));

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRouter);

app.use((_req, _res, next) => {
	next(createHttpError(404, { message: 'Resource not found' }));
});

app.use(ErrorHandler);

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default app;
