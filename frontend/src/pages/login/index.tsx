import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import * as yup from 'yup';

import Input from '../../components/Input';
import { AuthSection, FormBox } from '../../components/blocs';
import { Toast } from '../../utils/toats-utils';

import { login } from '../../redux/actions/auth.action';

import logo from '../../assets/logo.svg';

const emailSchema = yup.string().email().required('Valid email is required.');
const passwordSchema = yup
	.string()
	.min(8, 'Password must be at least 8 characters')
	.required('Password is required.');

const formSchema: any = yup.object().shape({
	email: emailSchema,
	password: passwordSchema,
});

const Login = ({ login }: any) => {
	const history = useHistory();
	const { loading } = useSelector(({ authentication }: any) => authentication);
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const handleBlur = (event: any, schema: any) => {
		const { value } = event.target;

		schema.validate(value).catch((error: any) => {
			Toast({
				message: error.message,
				type: 'error',
			});
		});
	};

	const handleChange = (e: any) => {
		const { value, name } = e.target;

		setValues(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const navigateToProducts = () => {
		history.push('/');
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!formSchema.isValid()) {
			return;
		}

		await login(values, navigateToProducts, Toast);
	};

	return (
		<AuthSection>
			<img src={logo} alt="logo" className="block w-24 mx-auto mb-16" />

			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Login</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
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
						<button
							className="capitalize p-2.5 rounded-md text-darkOrange border border-darkOrange mr-4"
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
						Don't have an account?{' '}
						<Link to="/register" className="capitalize underline">
							register
						</Link>
					</small>
				</form>
			</FormBox>
		</AuthSection>
	);
};

export default connect(null, { login })(Login);
