import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { TextArea } from '../../components/Input';

import { useAppMutation } from '../../hooks/useAppQuery';
import { fieldError } from '../../utils/error';

const Box = styled(FormBox)`
	max-width: 500px;
`;

const Product = () => {
	const { shopId } = useParams<any>();

	const [values, setValues] = useState({
		image: '',
		price: 0,
		quantity: 0,
		shop: `${shopId ?? ''}`,
		size: '',
		summary: '',
		name: '',
		colour: '',
		discount: 0,
	});

	const handleChange = ({ target }: any) => {
		if (target.name === 'image') {
			setValues(prevState => ({
				...prevState,
				image: target.files[0],
			}));
			return;
		} else {
			const { name, value } = target;

			setValues(prevState => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const formData = new FormData();

	const { mutate, error, isLoading: loading } = useAppMutation({
		url: 'products',
		data: formData,
	});
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		console.log(values, 'EXHIBITING');

		formData.append('image', values.image);
		formData.set('price', `${values.price}`);
		formData.set('discount', `${values.discount}`);
		formData.set('quantity', `${values.quantity}`);
		formData.set('shop', values.shop);
		formData.set('size', values.size);
		formData.set('summary', values.summary);
		formData.set('name', values.name);
		formData.set('colour', values.colour);
		formData.set('category', 'other');

		await mutate();
	};

	return (
		<AuthSection>
			<Box>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Add new product</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="Name"
						placeholder="Input Product Name"
						name="name"
						value={values.name}
						onChange={handleChange}
						type="text"
						error={fieldError('name', error)}
					/>

					<div className="flex justify-between">
						<Input
							label="Price"
							placeholder="Input price in USD"
							name="price"
							value={values.price}
							onChange={handleChange}
							type="number"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('price', error)}
						/>
						<Input
							label="Discount"
							placeholder="Input discount in USD"
							name="discount"
							value={values.discount}
							onChange={handleChange}
							type="number"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('discount', error)}
						/>
					</div>

					<div className="flex justify-between">
						<Input
							label="Quantity"
							placeholder="Input quantity"
							name="quantity"
							value={values.quantity}
							onChange={handleChange}
							type="number"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('quantity', error)}
						/>
						<Input
							label="Size"
							placeholder="Input size"
							name="size"
							value={values.size}
							onChange={handleChange}
							type="text"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('size', error)}
						/>
					</div>
					<Input
						label="Colour"
						placeholder="Input colour"
						name="colour"
						value={values.colour}
						onChange={handleChange}
						type="text"
						error={fieldError('colour', error)}
					/>
					<Input
						label="Image"
						placeholder="Input image"
						name="image"
						onChange={handleChange}
						type="file"
						error={fieldError('image', error)}
					/>

					<TextArea
						label="Summary"
						placeholder="Input summary"
						value={values.summary}
						name="summary"
						onChange={handleChange}
						error={fieldError('summary', error)}
					/>

					<div className="mb-4">
						<button
							className="capitalize p-2.5 rounded-md text-darkOrange border border-darkOrange mr-4 font-bold"
							type="reset"
						>
							cancel
						</button>
						<button
							className={`capitalize bg-darkOrange p-2.5 rounded-md text-white border-darkOrange ${
								loading ? 'disabled' : ''
							}`}
							type="submit"
							disabled={loading}
						>
							{loading ? <BeatLoader size={5} color="#fff" /> : 'submit'}
						</button>
					</div>
				</form>
			</Box>
		</AuthSection>
	);
};

export default Product;
