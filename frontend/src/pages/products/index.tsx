import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DotLoader } from 'react-spinners';

import { useAppQuery } from '../../hooks/useAppQuery';
import { setCurrentProduct } from '../../redux/reducers/products.reducer';
import { setCartItem } from '../../redux/reducers/cart.reducer';

export const Cards = styled.div.attrs({
	className: 'grid',
})`
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: 1em;
	padding: 1em;

	.til {
		grid-column: 1/-1;
	}
`;

export const Image = styled.div.attrs({
	className: 'h-full',
})`
	background-image: url(${(props: { url?: string }) => props.url});
	background-size: cover;
`;

const Products = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { data: products, isLoading } = useAppQuery('products', {
		url: 'products',
	});

	const [showDropdown, setShowDropdown] = useState(false);

	const [currId, setCurrId] = useState<any>(null);

	const handleDropdown = (id: string) => {
		setCurrId(id);
		setShowDropdown(!showDropdown);
	};

	const handleAddToCart = (item: any) => {
		dispatch(setCartItem({ data: { ...item, quantity: 1 }, shop: item?.shop?.id }));
	};

	useEffect(() => {
		dispatch(setCurrentProduct(null));
	}, [dispatch]);

	const handleProduct = (item: any) => {
		dispatch(setCurrentProduct(item));
		history.push(`/product/${item.id}`);
	};

	return (
		<Cards>
			<p className="til"></p>
			{isLoading ? (
				<p className="m-auto">
					<DotLoader color="#F9A109" />
				</p>
			) : !products?.data?.length ? (
				<p className="m-auto">No products yet</p>
			) : (
				products?.data.map((item: any) => {
					return (
						<div
							key={item.id}
							className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col cursor-pointer focus:shadow-lg hover:shadow-lg"
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
							<p className="text-center py-1 flex-20 capitalize">{item.name}</p>
						</div>
					);
				})
			)}
		</Cards>
	);
};

export default Products;
