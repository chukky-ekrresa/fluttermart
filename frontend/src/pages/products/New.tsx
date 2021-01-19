import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';

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
const sizeSchema = yup.string();
const nameSchema = yup.string().required('Name is required.');
const imageSchema = yup.mixed();
const discountSchema = yup.number();
const colorSchema = yup.string();

const formSchema: any = yup.object().shape({
	price: priceSchema,
	quantity: quantitySchema,
	size: sizeSchema,
	name: nameSchema,
	image: imageSchema,
	discount: discountSchema,
	color: colorSchema,
});

const Product = () => {
	const { shopId } = useParams<any>();
	const initialState = {
		image: '',
		price: '',
		quantity: 0,
		shop: `${shopId ?? ''}`,
		size: '',
		summary: '',
		name: '',
		colour: '',
		discount: 0,
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
			},
			onError: (error: any) => {
				Toast({
					message: error?.response?.data?.message,
					type: 'error',
				});
			},
		}
	);

	const formik = useFormik({
		initialValues: initialState,
		validationSchema: formSchema,
		onSubmit: async values => {
			const formData = new FormData();

			formData.append('image', values.image);
			formData.set('price', values.price);
			formData.set('discount', (values.discount as unknown) as string);
			formData.set('quantity', `${values.quantity}`);
			formData.set('shop', values.shop);
			formData.set('size', values.size);
			formData.set('summary', values.summary);
			formData.set('name', values.name);
			formData.set('colour', values.colour);
			formData.set('category', 'other');

			await mutate(formData);
		},
	});

	return (
		<AuthSection>
			<Box>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Add new product</p>
				<form className="w-11/12 mx-auto" onSubmit={formik.handleSubmit}>
					<Input
						label="Name"
						placeholder="Input Product Name"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						type="text"
						error={fieldError('name', error)}
						formik={formik}
					/>

					<div className="flex justify-between">
						<Input
							label="Price"
							placeholder="Input price in USD"
							name="price"
							value={formik.values.price}
							onChange={formik.handleChange}
							type="number"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('price', error)}
							formik={formik}
						/>
						<Input
							label="Discount"
							placeholder="Input discount in USD"
							name="discount"
							value={formik.values.discount}
							onChange={formik.handleChange}
							type="number"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('discount', error)}
							formik={formik}
						/>
					</div>

					<div className="flex justify-between">
						<Input
							label="Quantity"
							placeholder="Input quantity"
							name="quantity"
							value={formik.values.quantity}
							onChange={formik.handleChange}
							type="number"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('quantity', error)}
							formik={formik}
						/>
						<Input
							label="Size"
							placeholder="Input size"
							name="size"
							value={formik.values.size}
							onChange={formik.handleChange}
							type="text"
							classStyle={{ flexBasis: '48%' }}
							error={fieldError('size', error)}
							formik={formik}
						/>
					</div>
					<Input
						label="Colour"
						placeholder="Input colour"
						name="colour"
						value={formik.values.colour}
						onChange={formik.handleChange}
						type="text"
						error={fieldError('colour', error)}
						formik={formik}
					/>
					<Input
						label="Image"
						placeholder="Input image"
						name="image"
						onChange={evt => {
							formik.setFieldValue('image', evt.target.files[0]);
						}}
						type="file"
						error={fieldError('image', error)}
						formik={formik}
					/>

					<TextArea
						label="Summary"
						placeholder="Input summary"
						value={formik.values.summary}
						name="summary"
						onChange={formik.handleChange}
						error={fieldError('summary', error)}
						formik={formik}
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
