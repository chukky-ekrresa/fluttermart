import { DotLoader } from 'react-spinners';
import { useHistory } from 'react-router-dom';

import { useAppQuery } from '../../hooks/useAppQuery';

import { Cards, Image } from '../products/index';
import image from '../../assets/1.jpg';

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
				<p className="m-auto text-center">No shops yet</p>
			) : (
				<Cards>
					<p className="til"></p>

					{shops?.data.map((item: any) => {
						return (
							<div
								key={item.id}
								className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col cursor-pointer focus:shadow-lg hover:shadow-lg"
								onClick={() => handleClick(item.id)}
							>
								<div className="flex-80 rounded-lg">
									<Image url={image}></Image>
								</div>
								<p className="text-center py-1 flex-20 capitalize">{item.name}</p>
							</div>
						);
					})}
				</Cards>
			)}
		</>
	);
};

export default Shops;
