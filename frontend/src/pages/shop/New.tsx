import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { Select, TextArea } from '../../components/Input';

const Shop = () => {
	const [loading] = useState(false);

	const [values] = useState({
		address: '',
		country: '',
		email: '',
		name: '',
		phoneNumber: '',
	});

	const handleChange = () => {};

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		console.log(values);
	};

	return (
		<AuthSection>
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Add new shop</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="Name"
						placeholder="Input name"
						name="name"
						value={values.name}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Phone Number"
						placeholder="Input phone number"
						name="phoneNumber"
						value={values.phoneNumber}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Email"
						placeholder="Input email"
						name="email"
						value={values.email}
						onChange={handleChange}
						type="email"
					/>

					<Select />

					{/* <Input
						label="Country"
						placeholder="Input country"
						value={values.country}
						name="country"
						onChange={handleChange}
						type="text"
					/> */}

					<TextArea
						label="Address"
						placeholder="Input address"
						value={values.address}
						name="address"
						onChange={handleChange}
					/>

					{/* <Input
						label="Address"
						placeholder="Input address"
						value={values.address}
						name="address"
						onChange={handleChange}
						type="address"
					/> */}

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

export default Shop;
