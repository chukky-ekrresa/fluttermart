import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import loopQty from '../../utils/qtyLoop';

import { setEmptyCart } from '../../redux/reducers/cart.reducer';

const Row = styled.div`
	.name {
		flex: 3 3 50%;
	}

	.qty {
		flex: 1 1 12%;
	}

	.discount,
	.total {
		flex: 2 2 15%;
	}
`;
const Cart = () => {
	const dispatch = useDispatch();
	const { data } = useSelector(({ cart }: any) => cart);

	const handleQuantityChange = ({ target }: any) => {
		const { value } = target;

		console.log(value);
	};

	const handleClearCart = () => {
		dispatch(setEmptyCart());
	};

	return (
		<div className="w-full max-w-900 my-0 mx-auto border-b border-greyBorder">
			<div className="flex justify-between">
				<h1 className="font-bold capitalize text-24 mb-4">{`cart (${data.length} item${
					data.length > 1 ? 's' : ''
				})`}</h1>
				<button
					className="hidden sm:block capitalize underline text-darkOrange hover:font-extrabold"
					onClick={handleClearCart}
				>
					Clear Cart
				</button>
			</div>
			<Row className="flex border-b border-greyBorder pb-2 mb-2">
				<p className="capitalize name font-bold">product name</p>
				<p className="capitalize qty font-bold hidden sm:block">quantity</p>
				<p className="capitalize discount font-bold hidden sm:block">discount</p>
				<p className="capitalize total font-bold">total</p>
			</Row>

			{!data.length ? (
				<p className="w-full text-center">No Cart Item</p>
			) : (
				data.map((item: any) => {
					console.log(item);
					const arr = new Array(item.quantity);

					return (
						<Row className="flex mb-2" key={item._id}>
							<p className="capitalize name">{item.name}</p>
							<p className="qty hidden sm:block">
								<select onChange={handleQuantityChange} className="w-50">
									{loopQty(arr).map((num: number) => (
										<option key={num}>{num}</option>
									))}
								</select>
							</p>
							<p className="discount hidden sm:block">{item.price * item.discount}</p>
							<p className="total">{item.price}</p>
						</Row>
					);
				})
			)}
		</div>
	);
};

export default Cart;
