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

initialiseDatabase();

const app = express();

// Log requests
app.use(morgan('dev', { skip: () => ENV_VARS.NODE_ENV === 'test' }));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_req, _res, next) => {
	next(createHttpError(404, { message: 'Resource not found' }));
});

app.use(ErrorHandler);

export default app;
