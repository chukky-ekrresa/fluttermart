import { useState } from 'react';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/Input';

import login from '../../redux/actions/login.action';

const Box = styled.div.attrs({
	className: 'bg-lightOrange w-full md:max-w-screen-sm mx-auto rounded-md border border-darkOrange',
})`
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
	margin-top: 6em;
`;

const Login = ({ login }: any) => {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: any) => {
		const { value, name } = e.target;

		setValues(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await login(values);

		console.log(values);
	};

	return (
		<section className="w-11/12 container mx-auto my-0 min-h-screen">
			<Box>
				<p className="text-24 font-quicksand font-bold text-center">Login</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="Email"
						placeholder="Enter you email"
						name="email"
						value={values.email}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Password"
						placeholder="Enter you password"
						value={values.password}
						name="password"
						onChange={handleChange}
						type="password"
					/>
					<div className="mb-4">
						<button
							className="capitalize p-2.5 rounded-md text-darkOrange border border-darkOrange mr-4"
							type="reset"
						>
							cancel
						</button>
						<button
							className="capitalize bg-darkOrange p-2.5 rounded-md text-white border-darkOrange"
							type="submit"
						>
							submit
						</button>
					</div>
				</form>
			</Box>
		</section>
	);
};

export default connect(null, { login })(Login);
