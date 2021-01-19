import { DotLoader } from 'react-spinners';
import { Link, useHistory } from 'react-router-dom';

import { useAppQuery } from '../../hooks/useAppQuery';

import { Cards, Image } from '../products/index';

const Shops = () => {
	const history = useHistory();
	const { data: shops, isLoading } = useAppQuery('shops', {
		url: 'shops',
	});

	const handleClick = (id: string) => {
		console.log(id);

		history.push(`/shop/products/${id}`);
	};

	return (
		<>
			{isLoading ? (
				<p className="m-auto border border-black fixed top-2/4 left-2/4">
					<DotLoader color="#F9A109" />
				</p>
			) : !shops?.data?.length ? (
				<>
					<p className="text-center mt-4">No Shops Yet.</p>
					<div className="text-center">
						<button className="p-2.5 rounded-md text-darkOrange border border-darkOrange my-4 font-bold">
							<Link to="/new-shop">Create Shop</Link>
						</button>
					</div>
				</>
			) : (
				<Cards>
					<p className="til"></p>

					{shops?.data.map((item: any) => {
						return (
							<div
								key={item.id}
								className="border border-greyBorder rounded-lg h-80 max-h-80 overflow-hidden flex flex-col cursor-pointer focus:shadow-lg hover:shadow-lg"
								onClick={() => handleClick(item.id)}
							>
								<div className="flex-80 rounded-lg">
									<Image url={item?.image?.url}></Image>
								</div>
								<p className="text-center py-1 text-20 text-gray-700 font-semibold capitalize">
									{item?.name}
								</p>
								<p className="text-center py-1 text-14 capitalize">{item?.country}</p>
							</div>
						);
					})}
				</Cards>
			)}
		</>
	);
};

export default Shops;
