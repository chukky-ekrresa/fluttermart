import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import { AuthSection, FormBox } from '../../components/blocs';
import Input from '../../components/Input';

import { verifyEmail } from '../../redux/actions/auth.action';

const VerifyEmail = ({ verifyEmail }: any) => {
	const { loading } = useSelector(({ authentication }: any) => authentication);
	const { userID } = useParams<any>();
	const [values, setValues] = useState({
		otp: '',
		userId: userID ?? '',
	});

	const handleChange = ({ target }: any) => {
		const { name, value } = target;

		setValues(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		await verifyEmail(values);
	};

	return (
		<AuthSection>
			<FormBox>
				<p className="text-24 font-quicksand font-bold text-center mb-4">Input OTP</p>
				<form className="w-11/12 mx-auto" onSubmit={handleSubmit}>
					<Input
						label="OTP"
						placeholder="Enter OTP"
						name="otp"
						value={values.otp}
						onChange={handleChange}
						type="text"
					/>

					<div className="mb-4">
						<button
							className={`capitalize bg-darkOrange p-2.5 rounded-md text-white border-darkOrange ${
								loading ? 'disabled' : ''
							}`}
							type="submit"
						>
							{loading ? <BeatLoader size={5} color="#fff" /> : 'submit'}
						</button>
					</div>
				</form>
			</FormBox>
		</AuthSection>
	);
};

export default connect(null, { verifyEmail })(VerifyEmail);
