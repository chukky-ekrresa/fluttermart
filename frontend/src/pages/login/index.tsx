import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import Input from '../../components/Input';
import { AuthSection, FormBox } from '../../components/blocs';
import { Toast } from '../../utils/toats-utils';

import { login } from '../../redux/actions/auth.action';

const Login = ({ login }: any) => {
	const history = useHistory();
	const { loading } = useSelector(({ authentication }: any) => authentication);
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

	const navigateToProducts = () => {
		history.push('/');
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await login(values, navigateToProducts, Toast);
	};

	return (
		<AuthSection>
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
