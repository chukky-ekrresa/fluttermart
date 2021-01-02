import './config/env';
import http from 'http';

import app from './app';
import { logger } from './config/logger';
import ENV_VARS from './config/env';

/**
 * Believe it or not, reading process.env is expensive in NODE.js
 * https://github.com/nodejs/node/issues/3104
 * We want to cache process.env to a regular object since we don't expect it to change at runtime anyway.
 */
process.env = JSON.parse(JSON.stringify(process.env));

const { PORT } = ENV_VARS;

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event handler for HTTP server "error" event.
 */
function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event handler for HTTP server "listening" event.
 */
function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr!.port}`;

	logger.info(`Listening on ${bind}`);
}
