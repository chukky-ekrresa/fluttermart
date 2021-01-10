import supertest from 'supertest';
import { expect } from 'chai';
import 'mocha';

import app from '../src/app';
import { disconnectDB } from '../src/config/database';

const request = supertest(app);

describe('Express App', function () {
	it('app should be defined', async function () {
		expect(app).to.exist;
		await disconnectDB();
	});
});
