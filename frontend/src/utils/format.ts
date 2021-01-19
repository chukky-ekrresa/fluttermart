import { format } from 'date-fns';

export const formatDate = (date = '') => {
	const dateValue = new Date(`${date}`);
	return format(dateValue, 'Pp');
};

export const formatMoney = (money = 0) => {
	return new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
	}).format(money);
};
