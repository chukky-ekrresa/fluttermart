import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CgClose } from 'react-icons/cg';

import {
	setEmptyCart,
	changeCartItemQuantity,
	removeCartItem,
} from '../../redux/reducers/cart.reducer';

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
	.action {
		flex: 0 0 10%;
		display: flex;
		align-items: center;
	}
`;
const Cart = () => {
	const dispatch = useDispatch();
	const { data } = useSelector(({ cart }: any) => cart);

	const handleQuantityChange = (event: any, productId: any) => {
		const { value } = event.target;

		dispatch(changeCartItemQuantity({ productId, quantity: Number(value) }));
	};

	const handleClearCart = () => {
		dispatch(setEmptyCart());
	};

	return (
		<>
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
					<p className="capitalize discount font-bold hidden sm:block">price</p>
					<p className="capitalize total font-bold">total</p>
					<p className="capitalize action text-red-400"></p>
				</Row>

				{!data.length ? (
					<p className="w-full text-center">No Cart Item</p>
				) : (
					data.map((item: any) => {
						return (
							<Row className="flex mb-2" key={item._id}>
								<p className="capitalize name">{item.name}</p>
								<p className="qty hidden sm:block">
									<select
										onChange={e => handleQuantityChange(e, item._id)}
										value={item.quantity}
										className="w-50"
									>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
											<option key={num}>{num}</option>
										))}
									</select>
								</p>
								<p className="discount hidden sm:block">{item.normalized_price}</p>
								<p className="total">{item.normalized_price * item.quantity}</p>
								<p className="action">
									<CgClose
										color="rgba(220, 38, 38)"
										cursor="pointer"
										onClick={() => dispatch(removeCartItem({ productId: item.id }))}
									/>
								</p>
							</Row>
						);
					})
				)}
			</div>

			<div className="w-full max-w-900 mx-auto">
				<button className="p-2.5 rounded-md text-darkOrange border border-darkOrange my-4 font-bold">
					<Link to="/checkout">Checkout</Link>
				</button>
			</div>
		</>
	);
};

export default Cart;
