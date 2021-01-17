import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import * as yup from 'yup';

import { AuthSection, FormBox } from '../../components/blocs';
import Input, { RadioInput as Radio } from '../../components/Input';
import { Toast } from '../../utils/toats-utils';

import { register } from '../../redux/actions/auth.action';

import logo from '../../assets/logo.svg';

const emailSchema = yup.string().email().required('Valid email is required.');
const firstNameSchema = yup.string().required('First Name is required!');
const lastNameSchema = yup.string().required('Last Name is required!');
const passwordSchema = yup
	.string()
	.min(8, 'Password must be at least 8 characters')
	.required('Password is required.');

const formSchema: any = yup.object().shape({
	email: emailSchema,
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	password: passwordSchema,
});

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
		const isValid = await formSchema.isValid();

		if (!isValid) {
			Toast({
				message: 'Enter Valid Input!',
				type: 'error',
			});

			return;
		}

		await register(values, redirectToVerifyEmail, Toast);
	};

	return (
		<AuthSection>
			<img src={logo} alt="logo" className="block w-24 mx-auto mb-16" />
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
						handleBlur={handleBlur}
						schema={firstNameSchema}
					/>
					<Input
						label="Last Name"
						placeholder="Input last name"
						name="lastName"
						value={values.lastName}
						onChange={handleChange}
						type="text"
						handleBlur={handleBlur}
						schema={lastNameSchema}
					/>
					<Input
						label="Email"
						placeholder="Input email"
						name="email"
						value={values.email}
						onChange={handleChange}
						type="email"
						handleBlur={handleBlur}
						schema={emailSchema}
					/>
					<Input
						label="Password"
						placeholder="Input password"
						value={values.password}
						name="password"
						onChange={handleChange}
						type="password"
						handleBlur={handleBlur}
						schema={passwordSchema}
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
