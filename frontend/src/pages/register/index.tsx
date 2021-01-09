import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { RadioInput as Radio } from '../../components/Input';

import { register } from '../../redux/actions/auth.action';

const Register = ({ register }: any) => {
	const { loading } = useSelector(({ authentication }: any) => authentication);
	const history = useHistory();

	const [values, setValues] = useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		role: '',
	});

	const redirectToVerifyEmail = (userID: string) => {
		history.push(`/verify-email/${userID}`);
	};

	const handleChange = ({ target }: any) => {
		const { name, value, id } = target;

		setValues(prevState => {
			if (name === 'role') {
				return {
					...prevState,
					[name]: id,
				};
			} else {
				return {
					...prevState,
					[name]: value,
				};
			}
		});
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		await register(values, redirectToVerifyEmail);
		// console.log(values);
	};

	return (
		<AuthSection>
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Sign up here!</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="First Name"
						placeholder="Input first name"
						name="firstName"
						value={values.firstName}
						onChange={handleChange}
						type="text"
					/>
					<Input
						label="Last Name"
						placeholder="Input last name"
						name="lastName"
						value={values.lastName}
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
					<Input
						label="Password"
						placeholder="Input password"
						value={values.password}
						name="password"
						onChange={handleChange}
						type="password"
					/>

					<div className="mb-4">
						<p className="capitalize font-bold">Please select a role below:</p>
						<Radio
							name="role"
							id="customer"
							label="customer"
							value={values.role}
							onChange={handleChange}
						/>
						<Radio
							name="role"
							id="vendor"
							label="vendor"
							value={values.role}
							onChange={handleChange}
						/>
					</div>

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
					<small>
						Already have an account?{' '}
						<Link to="/login" className="capitalize underline">
							login here
						</Link>
					</small>
				</form>
			</FormBox>
		</AuthSection>
	);
};

export default connect(null, { register })(Register);
