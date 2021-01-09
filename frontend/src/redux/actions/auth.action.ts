import request from '../../utils/request';
import { setToken, setAuthLoading, setAuthError } from '../reducers/auth.reduser';

export const login = (payload: any) => async (dispatch: any) => {
	try {
		dispatch(setAuthLoading(true));
		const { data } = await request.post('auth/login', payload);

		console.log(data);
		dispatch(setAuthLoading(false));
	} catch (error) {
		dispatch(setAuthLoading(false));
		dispatch(setAuthError(error.response));
		console.log(error.response);
	}
};
export const register = (payload: any) => async (dispatch: any) => {
	try {
		const { data } = await request.post('auth/register', payload);

		console.log(data);
	} catch (error) {
		console.log(error.response);
	}
};
