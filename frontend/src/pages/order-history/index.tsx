import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'rodal';
import { useMutation } from 'react-query';

import { useAppQuery } from '../../hooks/useAppQuery';

import { formatDate, formatMoney } from '../../utils/format';
import request from '../../utils/request';
import { Toast } from '../../utils/toats-utils';

import { ModalContainer } from '../checkout/';
import { BeatLoader } from 'react-spinners';

const Row = styled.div`
	.name {
		flex-basis: 85%;
		@media (min-width: 660px) {
			flex-basis: 35%;
		}
	}

	.shop-name {
		flex-basis: 30%;
	}

	.status {
		flex-basis: 20%;
	}

	.cancel {
		flex-basis: 10%;
	}
`;

const OrderHistory = () => {
	const [visible, setVisible] = useState(false);
	const [currID, setCurrID] = useState('');
	const { data, isLoading } = useAppQuery('order-history', {
		url: 'orders/me',
	});

	const { mutate, isLoading: loading } = useMutation(
		(orderId: string) => {
			return request.put(`orders/${orderId}/cancel`);
		},
		{
			onSuccess: () => {
				Toast({
					message: 'Order successfully cancelled!',
					type: 'success',
				});
				setTimeout(() => {
					window.location.reload();
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

	const handleVisibility = (id: string) => {
		setCurrID(id);
		setVisible(!visible);
	};

	const handleCancel = (id: string) => {
		mutate(id);
	};

	return (
		<div className="w-full max-w-900 my-0 mx-auto border-b border-greyBorder">
			<div className="flex justify-between">
				<h1 className="font-bold capitalize text-24 mb-4">Order History</h1>
			</div>
			<Row className="flex border-b border-greyBorder pb-2 mb-2">
				<p className="capitalize name font-bold">Delivery Address</p>
				<p className="capitalize shop-name font-bold hidden sm:block">Time</p>
				<p className="capitalize status font-bold hidden sm:block">status</p>
				<p className="capitalize cancel font-bold"></p>
			</Row>

			{!data?.data?.length ? (
				<p className="w-full text-center">You have no order history!</p>
			) : isLoading ? (
				<p className="w-full text-center">Fetching order history...</p>
			) : (
				data?.data.map((item: any) => (
					<div
						onClick={() => handleVisibility(item._id)}
						className="cursor-pointer hover:bg-lightOrange border-b border-lightGrey py-1"
					>
						<ModalContainer>
							<Modal
								visible={visible && currID === item._id}
								showCloseButton={false}
								onClose={() => setVisible(false)}
								measure="em"
								width={30}
								height={'auto'}
							>
								<div>
									<h2 className="text-24 font-bold border-b border-greyBorder">Order Details</h2>
									<p className="capitalize border-b border-lightGrey py-2">
										<span className="font-bold mr-2">address:</span> {item.address}
									</p>
									<p className="capitalize border-b border-lightGrey py-2">
										<span className="font-bold mr-2">delivery fee:</span>
										{formatMoney(item.deliveryFee)}
									</p>
									<p className="capitalize border-b border-lightGrey py-2">
										<span className="font-bold mr-2">total:</span>
										{formatMoney(item.total)}
									</p>
									<p className="capitalize border-b border-lightGrey py-2">
										<span className="font-bold mr-2">date:</span>
										{formatDate(item.createdAt)}
									</p>

									<p className="font-bold mt-2">Items</p>
									<ul>
										{item.products.map((product: any) => (
											<li key={product._id}>
												{product.name} <span className="font-bold">-</span> {product.quantity}(qty){' '}
												<span className="font-bold">-</span> {formatMoney(product.price)}
											</li>
										))}
									</ul>
								</div>
							</Modal>
						</ModalContainer>

						<Row className="flex mb-2">
							<p className="capitalize name">{item.address}</p>
							<p className="shop-name hidden sm:block">{formatDate(item.createdAt)}</p>
							<p className="status hidden sm:block capitalize">{item.status}</p>
							<p className={`cancel ${item.status === 'confirmed' ? '' : 'hidden'}`}>
								<button
									className="p-1 rounded-md border border-darkOrange text-darkOrange"
									onClick={() => handleCancel(item._id)}
								>
									{loading ? <BeatLoader size={5} color="#fff" /> : 'cancel'}
								</button>
							</p>
						</Row>
					</div>
				))
			)}
		</div>
	);
};

export default OrderHistory;
