import supertest from 'supertest';
import { expect } from 'chai';
import 'mocha';

import app from '../src/app';
import { disconnectDB } from '../src/config/database';
import * as AuthData from './fixtures/auth';

const request = supertest(app);

describe('Authentication', function () {
	describe('Register Tests', function () {
		let registerResponse: any;

		it('should return validation error', async function () {
			const { status, body } = await request.post('/api/auth/register').send(AuthData.badPayload);

			expect(status).to.equal(400);
			expect(body.errors).to.exist;
		});

		it('should register a user', async function () {
			const { status, body } = await request.post('/api/auth/register').send(AuthData.validPayload);
			registerResponse = body.data;

			expect(status).to.equal(201);
			expect(body.data).to.exist;
		});

		it('should return bad request when using an already registered email', async function () {
			const { status } = await request.post('/api/auth/register').send(AuthData.validPayload);

			expect(status).to.equal(400);
		});

		it('should verify a user account', async function () {
			const { status, body } = await request
				.post('/api/auth/verify_account')
				.send(registerResponse);

			expect(status).to.equal(201);
			expect(body.data).to.exist;
		});
	});

	describe('Login Tests', function () {
		it('should return bad request when wrong credentials', async function () {
			const { status } = await request.post('/api/auth/login').send(AuthData.badLogin);

			expect(status).to.equal(401);
		});

		it('should login the user', async function () {
			const { status } = await request.post('/api/auth/login').send(AuthData.validLogin);

			expect(status).to.equal(200);
		});
	});

	after(function () {
		return disconnectDB();
	});
});
