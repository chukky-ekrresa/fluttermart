const initialState = {
	token: '',
	loading: false,
	error: null,
	registerResp: null,
	user: null,
};

export default function authentication(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_TOKEN':
			return {
				...state,
				token: action.payload,
			};
		case 'SET_AUTH_LOADING':
			return {
				...state,
				loading: action.payload,
			};
		case 'SET_AUTH_ERROR':
			return {
				...state,
				error: action.payload,
			};
		case 'SET_REGISTER_RESPONSE':
			return {
				...state,
				registerResp: action.payload,
			};
		case 'SET_USER_DATA':
			return {
				...state,
				user: action.payload,
			};
		case 'LOG_OUT':
			return initialState;

		default:
			return state;
	}
}

export const setToken = (payload: string) => ({
	type: 'SET_TOKEN',
	payload,
});
export const setAuthLoading = (payload: boolean) => ({
	type: 'SET_AUTH_LOADING',
	payload,
});
export const setAuthError = (payload: any) => ({
	type: 'SET_AUTH_ERROR',
	payload,
});
export const setRegisterResponse = (payload: any) => ({
	type: 'SET_REGISTER_RESPONSE',
	payload,
});
export const setUser = (payload: any) => ({
	type: 'SET_USER_DATA',
	payload,
});

export const logout = () => ({
	type: 'LOG_OUT',
});
