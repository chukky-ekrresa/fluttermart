import request from '../../utils/request';
// import { setToken } from '../reducers/auth.reduser';

const login = (payload: any) => async (dispatch: any) => {
	try {
		const { data } = await request.post('auth/login', payload);

		console.log(data);
	} catch (error) {
		console.log(error.response);
	}
};

export default login;
