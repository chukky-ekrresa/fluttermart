import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { Select, TextArea } from '../../components/Input';
import { Toast } from '../../utils/toats-utils';
import { EXCHANGE_RATES } from '../../utils/currencyConversion';

import { useAppQuery } from '../../hooks/useAppQuery';
import request from '../../utils/request';

const initialState = {
	address: '',
	country: '',
	email: '',
	name: '',
	image: '',
	phoneNumber: '',
	transactionId: '',
	transactionRef: '',
};

const formSchema: any = yup.object().shape({
	address: yup.string().required('Address is required'),
	country: yup.string().required('Country is required'),
	email: yup.string().email().required('Valid email is required.'),
	name: yup.string().required('Name is required'),
	image: yup.mixed().required(),
	phoneNumber: yup.string().required('Phone Number is required'),
});

const Shop = () => {
	const [toCurrency, setToCurrency] = useState('NGN');
	const history = useHistory();
	const queryClient = useQueryClient();

	const { mutate, isLoading: loading } = useMutation(
		(formData: any) => {
			return request.post('shops', formData);
		},
		{
			onSuccess: async () => {
				Toast({
					message: 'Shop successfully created!',
					type: 'success',
				});

				await queryClient.invalidateQueries('shops');

				setTimeout(() => {
					history.push('/');
				}, 1000);
			},
			onError: (error: any) => {
				Toast({
					message: error?.response?.data?.message,
					type: 'error',
				});
			},
		}
	);

	const { data: currencyData } = useAppQuery('currency', {
		url: `${process.env.REACT_APP_PROXY_URL}https://free.currconv.com/api/v7/convert?q=USD_${toCurrency}&compact=ultra&apiKey=${process.env.REACT_APP_EXCHANGE_RATE_KEY}`,
	});

	const handleCurrency = ({ target }: any) => {
		const { value } = target;

		setToCurrency(value);
	};

	const formik = useFormik({
		initialValues: initialState,
		validationSchema: formSchema,
		onSubmit: async values => {
			if (currencyData) {
				const formData = new FormData();

				formData.set('image', values.image);
				formData.set('name', values.name);
				formData.set('email', values.email);
				formData.set('phoneNumber', values.phoneNumber);
				formData.set('address', values.address);
				formData.set('country', values.country);

				handleFlutterPayment({
					callback: response => {
						formData.set('transactionId', (response?.transaction_id as unknown) as string);
						formData.set('transactionRef', response?.tx_ref);
						mutate(formData);

						closePaymentModal();
					},
					onClose: () => {},
				});
			}
		},
	});

	const config: any = {
		public_key: `${process.env.REACT_APP_FLW_PUBLIC_KEY}`,
		tx_ref: Date.now(),
		amount: 20 * currencyData ? currencyData?.[`USD_${toCurrency}`] : EXCHANGE_RATES[toCurrency],
		currency: toCurrency,
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: formik.values.email,
			phonenumber: formik.values.email,
			name: formik.values.name,
		},
		customizations: {
			title: 'New Shop on Jumga',
			description: 'Payment for creating new shop on Jumga',
			logo:
				'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	return (
		<AuthSection>
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Add new shop</p>
				<form className="w-11/12 mx-auto" onSubmit={formik.handleSubmit}>
					<Input
						label="Name"
						placeholder="Input name"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						type="text"
						formik={formik}
					/>
					<Input
						label="Phone Number"
						placeholder="Input phone number"
						name="phoneNumber"
						value={formik.values.phoneNumber}
						onChange={formik.handleChange}
						type="text"
						formik={formik}
					/>
					<Input
						label="Email"
						placeholder="Input email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						type="email"
						formik={formik}
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
						value={formik.values.country}
						name="country"
						onChange={formik.handleChange}
						type="text"
						formik={formik}
					/>

					<Input
						label="Image"
						placeholder="Input image"
						name="image"
						onChange={evt => {
							formik.setFieldValue('image', evt.target.files[0]);
						}}
						type="file"
						error={formik.errors.image}
						formik={formik}
					/>

					<TextArea
						label="Address"
						placeholder="Input address"
						value={formik.values.address}
						name="address"
						onChange={formik.handleChange}
						formik={formik}
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
