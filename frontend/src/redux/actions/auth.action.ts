import request from '../../utils/request';
import { setAuthLoading, setAuthError, setUserID, setToken } from '../reducers/auth.reduser';

export const login = (payload: any, navigateToProducts: any) => async (dispatch: any) => {
	try {
		dispatch(setAuthError(null));
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/login', payload);
		dispatch(setToken(data?.data));
		dispatch(setAuthLoading(false));
		navigateToProducts();
	} catch (error) {
		dispatch(setAuthLoading(false));
		dispatch(setAuthError(error.response));
		console.log(error.response);
	}
};
export const register = (payload: any, redirectToVerifyEmail: any) => async (dispatch: any) => {
	try {
		dispatch(setAuthError(null));
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/register', payload);
		dispatch(setUserID(data?.data));
		dispatch(setAuthLoading(false));

		redirectToVerifyEmail(data?.data);
	} catch (error) {
		dispatch(setAuthLoading(false));
		dispatch(setAuthError(error.response));
		console.log(error.response);
	}
};

export const verifyEmail = (payload: any) => async (dispatch: any) => {
	try {
		dispatch(setAuthError(null));
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/verify_account', payload);

		dispatch(setToken(data?.data));

		dispatch(setAuthLoading(false));
	} catch (error) {
		dispatch(setAuthLoading(false));
		dispatch(setAuthError(error.response));
		console.log(error.response);
	}
};
