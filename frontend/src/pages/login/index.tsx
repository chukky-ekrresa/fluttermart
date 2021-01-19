import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import * as yup from 'yup';
import { useFormik } from 'formik';

import Input from '../../components/Input';
import { AuthSection, FormBox } from '../../components/blocs';
import { Toast } from '../../utils/toats-utils';

import { login } from '../../redux/actions/auth.action';
import { setAuthLoading } from '../../redux/reducers/auth.reduser';

import logo from '../../assets/logo.svg';

const formSchema = yup.object().shape({
	email: yup.string().email().required('Valid email is required.'),
	password: yup
		.string()
		.min(7, 'Password must be at least 7 characters')
		.required('Password is required.'),
});

const Login = ({ login }: any) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { loading } = useSelector(({ authentication }: any) => authentication);

	useEffect(() => {
		dispatch(setAuthLoading(false));
	}, [dispatch]);

	const navigateToProducts = () => {
		history.push('/');
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: formSchema,
		onSubmit: async values => {
			await login(values, navigateToProducts, Toast);
		},
	});

	return (
		<AuthSection>
			<img src={logo} alt="logo" className="block w-24 mx-auto mb-16" />

			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Login</p>
				<form className="w-11/12 mx-auto" onSubmit={formik.handleSubmit}>
					<Input
						label="Email"
						placeholder="Input email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						type="email"
						formik={formik}
					/>
					<Input
						label="Password"
						placeholder="Input password"
						value={formik.values.password}
						name="password"
						onChange={formik.handleChange}
						type="password"
						formik={formik}
					/>
					<div className="mb-4 ">
						<button
							className={`capitalize bg-darkOrange p-2.5 rounded-md text-white border-darkOrange block w-full mx-auto ${
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
