import Axios from 'axios';
import store from '../store';

const instance = Axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

instance.interceptors.request.use(config => {
	const { token } = store.getState().authentication;

	if (token) {
		return {
			...config,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};
	}

	return config;
});

export default instance;
