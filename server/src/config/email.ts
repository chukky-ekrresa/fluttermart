import mailJet from 'node-mailjet';
import { InternalServerError } from 'http-errors';

import ENV_VARS from './env';
import { logger } from './logger';

const { MAIL_SENDER, MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC, NODE_ENV } = ENV_VARS;
const mailJetClient = mailJet.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

export async function sendEmail(input: IEmailInput) {
	return await mailJetClient
		.post('send', { version: 'v3.1', perform_api_call: NODE_ENV !== 'test' })
		.request({
			Messages: [
				{
					From: {
						Email: input.from ?? MAIL_SENDER,
						Name: 'FlutterMart',
					},
					To: [
						{
							Email: input.to,
							Name: input.name ?? 'Friend',
						},
					],
					Subject: input.subject,
					TextPart: 'Greetings from FlutterMart!',
					HTMLPart: input.html,
				},
			],
		})
		.catch(error => {
			logger.debug(error.message);
			throw new InternalServerError(`Email sending failed, check email and try again`);
		});
}

export interface IEmailInput {
	from?: string; // Must be a valid email
	to: string; // Must be an array of valid emails
	subject: string;
	html?: string;
	name?: string;
}
