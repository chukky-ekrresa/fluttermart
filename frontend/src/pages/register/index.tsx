import { connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import * as yup from 'yup';
import { useFormik } from 'formik';

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

	const redirectToVerifyEmail = (userID: string) => {
		history.push(`/verify-email/${userID}`);
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			role: '',
		},
		validationSchema: formSchema,
		onSubmit: async values => {
			await register(values, redirectToVerifyEmail, Toast);
		},
	});

	return (
		<AuthSection>
			<img src={logo} alt="logo" className="block w-24 mx-auto mb-16" />
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Sign up here!</p>
				<form className="w-11/12 mx-auto" onSubmit={formik.handleSubmit}>
					<Input
						label="First Name"
						placeholder="Input first name"
						name="firstName"
						value={formik.values.firstName}
						onChange={formik.handleChange}
						type="text"
						formik={formik}
					/>
					<Input
						label="Last Name"
						placeholder="Input last name"
						name="lastName"
						value={formik.values.lastName}
						onChange={formik.handleChange}
						type="text"
						formik={formik}
					/>
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

					<div className="mb-4">
						<p className="capitalize font-bold">Please select a role below:</p>
						<Radio
							name="role"
							id="customer"
							label="customer"
							value={formik.values.role}
							onChange={val => {
								formik.setFieldValue('role', val.target.id);
							}}
						/>
						<Radio
							name="role"
							id="vendor"
							label="vendor"
							value={formik.values.role}
							onChange={val => {
								formik.setFieldValue('role', val.target.id);
							}}
						/>
						{formik.touched.role && formik.errors.role ? (
							<small className="text-red-500">{formik.errors.role}</small>
						) : null}
					</div>

					<div className="mb-4">
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
