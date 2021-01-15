import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import phoneImg from '../../assets/1.jpg';
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

	console.log(products);
	const dropdownRef = useRef<any>();
	const [showDropdown, setShowDropdown] = useState(false);
	const handleClick = (event: any) => {
		if (dropdownRef.current.contains(event.target)) {
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
				products?.data.map((item: any, index: number) => (
					<div
						className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col cursor-pointer focus:shadow-lg hover:shadow-lg"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<div className="relative" ref={dropdownRef}>
							<ul
								className={`absolute border border-darkOrange py-4 px-2 w-44 bg-white rounded-md ${
									showDropdown ? '' : 'hidden'
								}`}
							>
								<li className={`border-b border-lightOrange cursor-pointer`}>
									<button className="block" onClick={handleAddToCart}>
										Cart
									</button>
								</li>
								<li className={`border-b border-lightOrange cursor-pointer`}>
									<button className="block" onClick={handleCheckout}>
										Checkout
									</button>
								</li>
							</ul>
						</div>
						<div className="flex-80 rounded-lg">
							<Image url={phoneImg}></Image>
						</div>
						<p className="text-center py-1 flex-20 capitalize">
							Cubot Note 7, 5.5 Inches,4G LTE,2GB
						</p>
					</div>
				))
			)}
		</Cards>
	);
};

export default Products;
