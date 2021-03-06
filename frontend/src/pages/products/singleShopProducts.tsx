import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useAppQuery } from '../../hooks/useAppQuery';

import { setCurrentProduct } from '../../redux/reducers/products.reducer';
import { setCartItem, setEmptyCart } from '../../redux/reducers/cart.reducer';

const Cards = styled.div.attrs({
	className: 'grid',
})`
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 1em;
	padding: 1em;

	.til {
		grid-column: 1/-1;
	}
`;

const Image = styled.div.attrs({
	className: 'h-full',
})`
	background-image: url(${(props: { url?: string }) => props.url});
	background-size: cover;
`;

const SingleShopProducts = () => {
	const { shopId } = useParams<any>();
	const dispatch = useDispatch();
	const cart = useSelector((state: any) => state.cart);
	const history = useHistory();
	const { data: products, isLoading } = useAppQuery('products', {
		url: `products/shop/${shopId}`,
	});

	const [showDropdown, setShowDropdown] = useState(false);
	const [currId, setCurrId] = useState<any>(null);

	useEffect(() => {
		if (cart.shop !== shopId) {
			dispatch(setEmptyCart());
		}
	}, [cart.shop, dispatch, shopId]);

	const handleDropdown = (id: string) => {
		setCurrId(id);
		setShowDropdown(!showDropdown);
	};

	const handleAddToCart = (item: any) => {
		dispatch(setCartItem({ data: { ...item, quantity: 1 }, shop: shopId }));
	};

	const handleProduct = (item: any) => {
		dispatch(setCurrentProduct(item));
		history.push(`/product/${item.id}`);
	};

	return (
		<Cards>
			<p className="til"></p>
			{isLoading ? (
				<p className="m-auto">Loading...</p>
			) : !products?.data?.length ? (
				<div>
					<p className="m-auto">No products yet</p>
					<button className="p-2.5 rounded-md text-darkOrange border border-darkOrange my-4 font-bold">
						<Link to={`/new-product/${shopId}`}>Add Product</Link>
					</button>
				</div>
			) : (
				products?.data.map((item: any) => {
					return (
						<div
							key={item.id}
							className="border border-greyBorder overflow-hidden rounded-lg h-80 max-h-80 flex flex-col cursor-pointer focus:shadow-lg hover:shadow-lg"
							onClick={() => handleDropdown(item.id)}
						>
							<div className="relative left-16 top-4">
								<ul
									className={`absolute border border-darkOrange pb-4 px-2 w-44 bg-white rounded-md ${
										showDropdown && item.id === currId ? '' : 'hidden'
									}`}
								>
									<li className="border-b border-lightOrange cursor-pointer py-2">
										<button
											className="block focus:outline-none"
											onClick={() => handleProduct(item)}
										>
											View Product
										</button>
									</li>
									<li className="border-b border-lightOrange cursor-pointer py-2">
										<button
											className="block focus:outline-none"
											onClick={() => handleAddToCart(item)}
										>
											Add to Cart
										</button>
									</li>
								</ul>
							</div>
							<div className="flex-80 rounded-lg">
								<Image url={item.image.url}></Image>
							</div>
							<p className="text-center py-1 capitalize">{item.name}</p>
							<p className="text-center font-semibold py-1 capitalize">${item.normalized_price}</p>
						</div>
					);
				})
			)}
		</Cards>
	);
};

export default SingleShopProducts;
