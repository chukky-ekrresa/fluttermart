import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { TextArea } from '../../components/Input';
import { Toast } from '../../utils/toats-utils';

import request from '../../utils/request';
import { fieldError } from '../../utils/error';

const Box = styled(FormBox)`
	max-width: 500px;
`;

const priceSchema = yup.number().required('Price is required.');
const quantitySchema = yup.number().required('Quantity is required.');
const sizeSchema = yup.string().required('Size is required.');
const nameSchema = yup.string().required('Name is required.');
const imageSchema = yup.mixed();
const discountSchema = yup.number();
const colorSchema = yup.string();

// const formSchema: any = yup.object().shape({
// 	price: priceSchema,
// 	quantity: quantitySchema,
// 	size: sizeSchema,
// 	name: nameSchema,
// 	image: imageSchema,
// });

const Product = () => {
	const { shopId } = useParams<any>();
	const initialState = {
		image: '',
		price: 0,
		quantity: 0,
		shop: `${shopId ?? ''}`,
		size: '',
		summary: '',
		name: '',
		colour: '',
		discount: 0,
	};

	const [values, setValues] = useState(initialState);

	const handleBlur = (event: any, schema: any) => {
		const { value } = event.target;

		schema.validate(value).catch((error: any) => {
			Toast({
				message: error.message,
				type: 'error',
			});
		});
	};

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

	const { mutate, error, isLoading: loading } = useMutation(
		(formData: any) => {
			return request.post('products', formData);
		},
		{
			onSuccess: () => {
				Toast({
					message: 'Product successfully created!',
					type: 'success',
				});
				setValues(initialState);
			},
			onError: (error: any) => {
				Toast({
					message: error?.response?.data?.message,
					type: 'error',
				});
			},
		}
	);
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		// const isValid = await formSchema.isValid();

		// if (!isValid) {
		// 	Toast({
		// 		message: 'Enter Valid Input!',
		// 		type: 'error',
		// 	});

		// 	return;
		// }

		const formData = new FormData();

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

		await mutate(formData);
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
						handleBlur={handleBlur}
						schema={nameSchema}
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
							handleBlur={handleBlur}
							schema={priceSchema}
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
							handleBlur={handleBlur}
							schema={discountSchema}
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
							handleBlur={handleBlur}
							schema={quantitySchema}
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
							handleBlur={handleBlur}
							schema={sizeSchema}
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
						handleBlur={handleBlur}
						schema={colorSchema}
					/>
					<Input
						label="Image"
						placeholder="Input image"
						name="image"
						onChange={handleChange}
						type="file"
						error={fieldError('image', error)}
						handleBlur={handleBlur}
						schema={imageSchema}
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
