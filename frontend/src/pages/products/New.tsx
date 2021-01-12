import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { TextArea } from '../../components/Input';

const Product = () => {
	const [loading] = useState(false);

	const [values, setValues] = useState({
		image: null,
		price: 0,
		quantity: '',
		shop: '',
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
			const [name, value] = target;

			setValues(prevState => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		// const formData = new FormData();

		console.log(values);
	};

	return (
		<AuthSection>
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Add new product</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="Name"
						placeholder="Input Product Name"
						name="name"
						value={values.name}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Price"
						placeholder="Input price in USD"
						name="price"
						value={values.price}
						onChange={handleChange}
						type="number"
					/>
					<Input
						label="Discount"
						placeholder="Input discount in USD"
						name="discount"
						value={values.discount}
						onChange={handleChange}
						type="number"
					/>
					<Input
						label="Quantity"
						placeholder="Input quantity"
						name="quantity"
						value={values.quantity}
						onChange={handleChange}
						type="number"
					/>
					<Input
						label="Size"
						placeholder="Input size"
						name="size"
						value={values.size}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Colour"
						placeholder="Input colour"
						name="colour"
						value={values.colour}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Image"
						placeholder="Input image"
						name="image"
						// value={values.image}
						onChange={handleChange}
						type="file"
					/>

					<TextArea
						label="Summary"
						placeholder="Input summary"
						value={values.summary}
						name="summary"
						onChange={handleChange}
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
			</FormBox>
		</AuthSection>
	);
};

export default Product;
