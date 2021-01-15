const initialState = {
	token: '',
	loading: false,
	error: null,
	userID: '',
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
		case 'SET_USER_ID':
			return {
				...state,
				userID: action.payload,
			};
		case 'SET_USER_DATA':
			return {
				...state,
				user: action.payload,
			};
		case 'LOG_OUT':
			return null;

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
export const setUserID = (payload: any) => ({
	type: 'SET_USER_ID',
	payload,
});
export const setUser = (payload: any) => ({
	type: 'SET_USER_DATA',
	payload,
});

export const logout = () => ({
	type: 'LOG_OUT',
});
