import winston from 'winston';

export const logger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.json(),
		winston.format.colorize({ all: true })
	),
	level: 'debug',
	exitOnError: false,
	silent: process.env.NODE_ENV === 'test',
});
