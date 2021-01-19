import { useHistory, useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { AuthSection, FormBox } from '../../components/blocs';
import Input from '../../components/Input';
import { Toast } from '../../utils/toats-utils';

import { verifyEmail } from '../../redux/actions/auth.action';

import logo from '../../assets/logo.svg';

const formSchema: any = yup.object().shape({
	otp: yup.string().min(6, 'Must be 6 characters').required(),
	userId: yup.string(),
});

const VerifyEmail = ({ verifyEmail }: any) => {
	const history = useHistory();
	const { loading } = useSelector(({ authentication }: any) => authentication);
	const { userID } = useParams<any>();

	const navToHome = () => {
		history.push('/');
	};

	const formik = useFormik({
		initialValues: {
			otp: '',
			userId: userID ?? '',
		},
		validationSchema: formSchema,
		onSubmit: async values => {
			await verifyEmail(values, navToHome, Toast);
		},
	});

	return (
		<AuthSection>
			<img src={logo} alt="logo" className="block w-24 mx-auto mb-16" />
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Input OTP</p>
				<form className="w-11/12 mx-auto" onSubmit={formik.handleSubmit}>
					<Input
						label="OTP"
						placeholder="Enter OTP"
						name="otp"
						value={formik.values.otp}
						onChange={formik.handleChange}
						type="text"
						formik={formik}
					/>

					<div className="mb-4">
						<button
							className={`capitalize bg-darkOrange p-2.5 rounded-md text-white border-darkOrange block w-full mx-auto ${
								loading ? 'disabled' : ''
							}`}
							type="submit"
						>
							{loading ? <BeatLoader size={5} color="#fff" /> : 'verify'}
						</button>
					</div>
				</form>
			</FormBox>
		</AuthSection>
	);
};

export default connect(null, { verifyEmail })(VerifyEmail);
