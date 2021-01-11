import supertest from 'supertest';
import { expect } from 'chai';
import 'mocha';

import app from '../src/app';
import { disconnectDB } from '../src/config/database';
import { getUserById } from '../src/api/repositories/userRepo';
import * as AuthData from './fixtures/auth';

const request = supertest(app);

describe('Authentication', function () {
	describe('Register Tests', function () {
		it('should return validation error', async function () {
			const { status, body } = await request.post('/api/auth/register').send(AuthData.badPayload);

			expect(status).to.equal(400);
			expect(body.errors).to.exist;
		});

		it('should register a user and verify a user account', async function () {
			// Register User
			const { status, body } = await request.post('/api/auth/register').send(AuthData.validPayload);

			expect(status).to.equal(201);
			expect(body.data).to.exist;

			// Verify Account
			const user = await getUserById(body.data);
			const { status: verifyStatus, body: verifyBody } = await request
				.post('/api/auth/verify_account')
				.send({ otp: user?.otp, userId: user?._id });

			expect(verifyStatus).to.equal(200);
			expect(verifyBody.data).to.exist;
		});

		it('should return bad request when using an already registered email', async function () {
			const { status } = await request.post('/api/auth/register').send(AuthData.validPayload);

			expect(status).to.equal(400);
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
