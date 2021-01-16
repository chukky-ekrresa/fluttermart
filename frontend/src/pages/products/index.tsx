import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useAppQuery } from '../../hooks/useAppQuery';

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

const Products = () => {
	const { data: products, isLoading } = useAppQuery('products', {
		url: 'products',
	});
	const optionRef = useRef<any>();
	const [showDropdown, setShowDropdown] = useState(false);
	const handleClick = (event: any) => {
		if (optionRef?.current?.contains(event.target)) {
			return;
		}
		setShowDropdown(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const handleAddToCart = () => {
		console.log('Adding to cart');
	};
	const handleCheckout = () => {
		console.log('Checking out');
	};

	return (
		<Cards>
			<p className="til"></p>
			{isLoading ? (
				<p className="m-auto">Loading...</p>
			) : !products?.data?.length ? (
				<p className="m-auto">No products yet</p>
			) : (
				products?.data.map((item: any) => {
					return (
						<div
							key={item.id}
							className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col cursor-pointer focus:shadow-lg hover:shadow-lg"
							onClick={() => setShowDropdown(!showDropdown)}
						>
							<div className="relative left-16 top-4" ref={optionRef}>
								<ul
									className={`absolute border border-darkOrange pb-4 px-2 w-44 bg-white rounded-md ${
										showDropdown ? '' : 'hidden'
									}`}
								>
									<li className="border-b border-lightOrange cursor-pointer py-2">
										<button className="block focus:outline-none" onClick={handleAddToCart}>
											Add to Cart
										</button>
									</li>
									<li className="border-b border-lightOrange cursor-pointer py-2">
										<button className="block focus:outline-none" onClick={handleCheckout}>
											Buy Item
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
