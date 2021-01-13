import styled from 'styled-components';

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
	const handleQuantityChange = ({ target }: any) => {
		const { value } = target;

		console.log(value);
	};

	return (
		<div className="w-full max-w-900 my-0 mx-auto border-b border-greyBorder">
			<h1 className="font-bold capitalize text-24 mb-4">cart (1 item)</h1>
			<Row className="flex border-b border-greyBorder pb-2 mb-2">
				<p className="capitalize name font-bold">product name</p>
				<p className="capitalize qty font-bold">quantity</p>
				<p className="capitalize discount font-bold">discount</p>
				<p className="capitalize total font-bold">total</p>
			</Row>
			<Row className="flex mb-2">
				<p className="capitalize name">phone 11 X 8 7 Audio Jack Converter Lightening</p>
				<p className="qty">
					<select onChange={handleQuantityChange}>
						{[1, 2, 3, 4, 5].map((num: number) => (
							<option key={num}>{num}</option>
						))}
					</select>
				</p>
				<p className="discount"># 300</p>
				<p className="total"># 3000</p>
			</Row>
		</div>
	);
};

export default Cart;
