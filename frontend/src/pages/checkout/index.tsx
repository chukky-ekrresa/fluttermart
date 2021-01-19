import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { FormikValues, useFormik } from 'formik';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import Modal from 'rodal';
import jwt from 'jsonwebtoken';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import * as yup from 'yup';

import Input, { Select } from '../../components/Input';
import { setEmptyCart } from '../../redux/reducers/cart.reducer';
import { calculateCartQty, calculateCartTotal } from '../../utils/cartUtils';
import { useAppQuery } from '../../hooks/useAppQuery';
import { Toast } from '../../utils/toats-utils';
import request from '../../utils/request';
import { EXCHANGE_RATES } from '../../utils/currencyConversion';

const DELIVERY_FEE = 10;

const Checkout = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [currency, setCurrency] = useState('NGN');
	const [visible, setVisible] = useState(false);
	const { authentication, cart } = useSelector((state: any) => state);
	const userDetails = jwt.decode(authentication.token) as Record<string, any>;

	const { data: shopAccountData } = useAppQuery('shop-accountInfo', {
		url: `/shops/${cart.shop}/account_info`,
	});

	const { mutate, isLoading: loading } = useMutation(
		(formData: any) => {
			return request.post('orders', formData);
		},
		{
			onSuccess: () => {
				Toast({
					message: 'Order was placed successfully!',
					type: 'success',
				});

				dispatch(setEmptyCart());

				setTimeout(() => {
					history.push('/order-history');
				}, 1500);
			},
			onError: (error: any) => {
				Toast({
					message: error?.response?.data?.message,
					type: 'error',
				});
			},
		}
	);

	const config = {
		public_key: 'FLWPUBK_TEST-704b2bf8ba3f3fdb3de8cd95da40f344-X',
		amount: Math.round((calculateCartTotal(cart.data) + DELIVERY_FEE) * EXCHANGE_RATES[currency]),
		tx_ref: userDetails.id + '-' + Date.now(),
		currency: currency,
		payment_options: 'card,mobilemoney,ussd',
		customer: {
			email: userDetails.email,
			phonenumber: '07064586146',
			name: userDetails.firstName + userDetails.lastName,
		},
		subaccounts: [
			{
				id: shopAccountData?.data?.dispatchRider?.account?.subaccount_id,
				transaction_charge_type: 'flat_subaccount',
				transaction_split_ratio: Math.round(0.8 * DELIVERY_FEE * EXCHANGE_RATES[currency]),
			},
			{
				id: shopAccountData?.data?.account?.subaccount_id,
				transaction_charge_type: 'percentage',
				transaction_charge: 0.925,
			},
		],
		customizations: {
			title: 'New Order',
			description: 'Place order with Jumga',
			logo:
				'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	const formik = useFormik({
		initialValues: {
			address: '',
			country: '',
			products: cart.data,
			shop: cart.shop,
		},
		onSubmit: async (values: FormikValues) => {
			values.deliveryFee = Math.round(0.8 * DELIVERY_FEE * EXCHANGE_RATES[currency]);
			values.total = Math.round(
				(calculateCartTotal(cart.data) + DELIVERY_FEE) * EXCHANGE_RATES[currency]
			);

			handleFlutterPayment({
				callback: response => {
					if (response.status === 'successful') {
						values.transactionId = response.transaction_id;
						values.transactionRef = response.tx_ref;

						mutate(values);
						closePaymentModal();
					}
				},
				onClose: () => {},
			});
		},
		validationSchema: formSchema,
	});

	if (cart.data.length === 0) {
		return (
			<div className="w-full text-center max-w-500 mx-auto my-0 shadow-md px-4">Cart is empty</div>
		);
	}

	return (
		<>
			<ModalContainer>
				<Modal
					visible={visible}
					showCloseButton={false}
					onClose={() => setVisible(false)}
					measure="em"
					width={30}
					height="auto"
				>
					<h2 className="text-center mb-2">Complete your Details</h2>
					<form onSubmit={formik.handleSubmit}>
						<Input
							label="Address"
							placeholder="Enter your address"
							name="address"
							value={formik.values.address}
							onChange={formik.handleChange}
							type="text"
							formik={formik}
						/>
						<Input
							label="Country"
							placeholder="Enter your country"
							name="country"
							value={formik.values.country}
							onChange={formik.handleChange}
							type="text"
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
							name="currency"
							handleChange={(e: any) => setCurrency(e.target.value)}
							defaultValue={currency}
						/>
						<p className="mb-2">
							Amount:{' '}
							{Math.round(
								(calculateCartTotal(cart.data) + DELIVERY_FEE) * EXCHANGE_RATES[currency]
							)}
						</p>
						<button
							className="w-full bg-yellow-500 rounded p-2 text-white font-semibold"
							type="submit"
						>
							Continue
						</button>
					</form>
				</Modal>
			</ModalContainer>
			<h1 className="font-bold capitalize text-24 mb-4">Checkout</h1>
			<div className="w-full max-w-500 mx-auto my-0 shadow-md px-4">
				<p className="text-center py-4 border-b border-lightGrey">
					Order ({calculateCartQty(cart.data)} Items)
				</p>
				{cart.data.map((product: any) => (
					<div key={product.id} className="py-4 border-b border-lightGrey">
						<p>{product.name}</p>
						<p>${product.normalized_price}</p>
						<p>Qty: {product.quantity}</p>
					</div>
				))}

				<div className="border-b py-2 border-lightGrey">
					<p>
						<span className="font-bold">Subtotal:</span> ${calculateCartTotal(cart.data)}
					</p>
					<p>
						<span className="font-bold">Delivery Fee:</span> ${DELIVERY_FEE}
					</p>
				</div>

				<div className="border-b py-2 border-lightGrey">
					<p className="text-center font-extrabold">
						Total: ${calculateCartTotal(cart.data) + DELIVERY_FEE}
					</p>
				</div>

				<button
					className="w-full p-2.5 rounded-md text-darkOrange border border-darkOrange my-4 font-bold"
					onClick={() => {
						setVisible(true);
					}}
				>
					{loading ? <BeatLoader size={5} color="#fff" /> : 'Place Order'}
				</button>
			</div>
		</>
	);
};

export default Checkout;

const formSchema: any = yup.object().shape({
	address: yup.string().required('Address is required'),
	country: yup.string().required('Country is required'),
});

export const ModalContainer = styled.span`
	position: absolute;
	z-index: 1000;

	.rodal-dialog {
		height: auto;
	}
`;
