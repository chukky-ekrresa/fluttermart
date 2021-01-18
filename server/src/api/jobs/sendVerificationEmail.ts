import { Job } from 'agenda';
import { addMinutes } from 'date-fns';
import { IEmailInput, sendEmail } from '../../config/email';

export function sendEmailJob(agenda: any) {
	agenda.define('send user verification email', { priority: 'highest' }, async (job: Job) => {
		const emailInput = job.attrs.data as IEmailInput;

		try {
			return await sendEmail(emailInput);
		} catch (error) {
			if (!job.attrs.failCount) {
				job.attrs.failCount = 1;
			} else {
				job.attrs.failCount++;
			}

			if (job.attrs.failCount < 5) {
				job.attrs.nextRunAt = addMinutes(new Date(), 5);
			} else {
				job.attrs.failedAt = new Date();
			}

			return await job.save();
		}
	});
}
