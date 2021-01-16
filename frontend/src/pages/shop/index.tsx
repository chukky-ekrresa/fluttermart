// import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineEllipsis } from 'react-icons/ai';

import { useAppQuery } from '../../hooks/useAppQuery';

import Dropdown from '../../components/Dropdown';

const Row = styled.div`
	.name {
		flex: 2 2 35%;
	}

	.add {
		flex: 2 2 45%;
	}

	.options {
		flex: 1 1 15%;
	}
`;

const Shops = () => {
	const { data, isLoading } = useAppQuery('vendor-shops', {
		url: 'shops/me',
	});

	return (
		<div className="w-full max-w-900 mx-auto">
			<h1 className="font-bold text-24 mb-4">Shops</h1>

			<Row className="flex justify-between border-b border-greyBorder">
				<p className="name capitalize">name</p>
				<p className="add capitalize hidden sm:block">address</p>
				<p className="options capitalize text-center">options</p>
			</Row>

			{isLoading ? (
				<p className="text-center mt-4">Loading..</p>
			) : !data?.data?.length ? (
				<p className="text-center mt-4">No Shop Yet.</p>
			) : (
				data?.data.map((shop: any) => {
					return (
						<Row className="flex justify-between border-b py-4 border-lightGrey" key={shop._id}>
							<p className="name capitalize">{shop.name}</p>
							<p className="add capitalize hidden sm:block">{shop.address}</p>
							<div className="options">
								<Dropdown
									Icon={AiOutlineEllipsis}
									options={[
										{
											'Add Product': `/new-product/${shop._id}`,
										},
										{
											'View Shop': `/shop/products/${shop._id}`,
										},
									]}
								/>
							</div>
						</Row>
					);
				})
			)}
		</div>
	);
};

export default Shops;
