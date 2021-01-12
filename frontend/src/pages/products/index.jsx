import styled from 'styled-components';

import phoneImg from '../../assets/1.jpg';

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
	background-image: url(${props => props.url});
	background-size: cover;
`;

const Products = () => {
	return (
		<div className="w-11/12 mx-auto my-0">
			<div className="border-b border-greyBorder mb-8 py-2">
				<p>Home</p>
			</div>
			<Cards>
				<p className="til"></p>
				<div className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col">
					<div className="flex-80">
						<Image url={phoneImg}></Image>
					</div>
					<p className="text-center py-1 flex-20 capitalize">Cubot Note 7, 5.5 Inches,4G LTE,2GB</p>
				</div>
				<div className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col">
					<div className="flex-80">
						<Image url={phoneImg}></Image>
					</div>
					<p className="text-center py-1 flex-20 capitalize">Cubot Note 7, 5.5 Inches,4G LTE,2GB</p>
				</div>
				<div className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col">
					<div className="flex-80">
						<Image url={phoneImg}></Image>
					</div>
					<p className="text-center py-1 flex-20 capitalize">Cubot Note 7, 5.5 Inches,4G LTE,2GB</p>
				</div>
				<div className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col">
					<div className="flex-80">
						<Image url={phoneImg}></Image>
					</div>
					<p className="text-center py-1 flex-20 capitalize">Cubot Note 7, 5.5 Inches,4G LTE,2GB</p>
				</div>
				<div className="border border-greyBorder rounded-lg h-80 max-h-80 flex flex-col">
					<div className="flex-80">
						<Image url={phoneImg}></Image>
					</div>
					<p className="text-center py-1 flex-20 capitalize">Cubot Note 7, 5.5 Inches,4G LTE,2GB</p>
				</div>
			</Cards>
		</div>
	);
};

export default Products;
