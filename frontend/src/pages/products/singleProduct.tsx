import { useSelector } from 'react-redux';

const SingleProduct = () => {
	const { currProductData } = useSelector(({ products }: any) => products);

	return (
		<>
			<p className="mx-auto text-24 font-bold">{currProductData?.name ?? ''}</p>
			<div className="w-full max-w-900 border border-red mx-auto flex justify-between flex-col sm:flex-row p-2">
				<div className="h-2/5 sm:flex-40">
					<img src={currProductData?.image?.url ?? ''} className="w-full h-full" alt="product" />
				</div>
				<div className="sm:pl-2  sm:flex-60">
					<p className="text-24 mb-4">{currProductData?.name ?? ''}</p>
					<p className="font-bold mb-4">{currProductData?.price ?? '0.00'}</p>
					<p className="capitalize mb-4">{currProductData?.summary ?? ''}</p>

					<button className="capitalize p-2.5 rounded-md text-darkOrange border border-darkOrange mr-4">
						Add To Cart
					</button>
				</div>
			</div>
		</>
	);
};

export default SingleProduct;
