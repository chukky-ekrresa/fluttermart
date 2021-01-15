import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useMutation } from 'react-query';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { Select, TextArea } from '../../components/Input';

import { useAppQuery } from '../../hooks/useAppQuery';
import request from '../../utils/request';

const Shop = () => {
	const { mutate, isLoading: loading } = useMutation((formData: any) => {
		return request.post('shops', formData);
	});

	const [toCurrency, setToCurrency] = useState('');

	const [values, setValues] = useState({
		address: '',
		country: '',
		email: '',
		name: '',
		phoneNumber: '',
		transactionId: '',
		transactionRef: '',
	});

	const { data: currencyData } = useAppQuery('currency', {
		url: `${process.env.REACT_APP_PROXY_URL}https://free.currconv.com/api/v7/convert?q=USD_${
			toCurrency ?? ''
		}&compact=ultra&apiKey=${process.env.REACT_APP_EXCHANGE_RATE_KEY}`,
	});
	console.log({ toCurrency, currencyData });

	const config: any = {
		public_key: `${process.env.REACT_APP_FLW_PUBLIC_KEY}`,
		tx_ref: Date.now(),
		amount: 20 * currencyData?.[`USD_${toCurrency}`],
		currency: `${toCurrency ?? ''}`,
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: values.email,
			phonenumber: values.email,
			name: values.name,
		},
		customizations: {
			title: 'New Shop on Jumga',
			description: 'Payment for creating new shop on Jumga',
			logo:
				'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	const handleChange = ({ target }: any) => {
		const { name, value } = target;

		setValues(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCurrency = ({ target }: any) => {
		const { value } = target;

		setToCurrency(value);
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (currencyData) {
			handleFlutterPayment({
				callback: response => {
					mutate({
						...values,
						transactionId: response?.tx_ref,
						transactionRef: response?.transaction_id,
					});

					closePaymentModal();
				},
				onClose: () => {},
			});
		}
	};

	return (
		<AuthSection>
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Add new shop</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="Name"
						placeholder="Input name"
						name="name"
						value={values.name}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Phone Number"
						placeholder="Input phone number"
						name="phoneNumber"
						value={values.phoneNumber}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Email"
						placeholder="Input email"
						name="email"
						value={values.email}
						onChange={handleChange}
						type="email"
					/>

					<Select
						options={[
							{ value: 'NGN', label: 'Nigerian Naira' },
							{ value: 'KES', label: 'Kenyan Shilling' },
							{ value: 'GHS', label: 'Ghanaian Cedi' },
							{ value: 'GBP', label: 'British Pound' },
						]}
						label="Currency"
						name="toCurrency"
						handleChange={handleCurrency}
						defaultValue={toCurrency}
					/>

					<Input
						label="Country"
						placeholder="Input country"
						value={values.country}
						name="country"
						onChange={handleChange}
						type="text"
					/>

					<TextArea
						label="Address"
						placeholder="Input address"
						value={values.address}
						name="address"
						onChange={handleChange}
					/>

					<div className="mb-4">
						<button
							className="capitalize p-2.5 rounded-md text-darkOrange border border-darkOrange mr-4 font-bold"
							type="reset"
						>
							cancel
						</button>
						<button
							className={`capitalize bg-darkOrange p-2.5 rounded-md text-white border-darkOrange ${
								loading ? 'disabled' : ''
							}`}
							type="submit"
							disabled={loading}
						>
							{loading ? <BeatLoader size={5} color="#fff" /> : 'submit'}
						</button>
					</div>
				</form>
			</FormBox>
		</AuthSection>
	);
};

export default Shop;
