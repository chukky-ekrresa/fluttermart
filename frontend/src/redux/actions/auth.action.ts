import request from '../../utils/request';
import { setAuthLoading, setAuthError, setUserID, setToken } from '../reducers/auth.reduser';

export const login = (payload: any, navigateToProducts: any, Toast: any) => async (
	dispatch: any
) => {
	try {
		dispatch(setAuthError(null));
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/login', payload);
		dispatch(setToken(data?.data));
		dispatch(setAuthLoading(false));
		navigateToProducts();
		Toast({
			message: 'Logged In!',
			type: 'success',
		});
	} catch (error) {
		dispatch(setAuthLoading(false));
		Toast({
			message: error?.response?.data?.message,
			type: 'error',
		});
		dispatch(setAuthError(error.response));
	}
};
export const register = (payload: any, redirectToVerifyEmail: any, Toast: any) => async (
	dispatch: any
) => {
	try {
		dispatch(setAuthError(null));
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/register', payload);
		dispatch(setUserID(data?.data));
		dispatch(setAuthLoading(false));

		redirectToVerifyEmail(data?.data);
		Toast({
			message: 'Success! Now verify Account.',
			type: 'success',
		});
	} catch (error) {
		dispatch(setAuthLoading(false));

		Toast({
			message: error?.response?.data?.message,
			type: 'error',
		});

		dispatch(setAuthError(error.response));
	}
};

export const verifyEmail = (payload: any, navToHome: any, Toast: any) => async (dispatch: any) => {
	try {
		dispatch(setAuthError(null));
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/verify_account', payload);

		dispatch(setToken(data?.data));

		dispatch(setAuthLoading(false));

		navToHome();
		Toast({
			message: 'Success! Account Verified.',
			type: 'success',
		});
	} catch (error) {
		dispatch(setAuthLoading(false));
		Toast({
			message: error?.response?.data?.message,
			type: 'error',
		});
		dispatch(setAuthError(error.response));
	}
};
