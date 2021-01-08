const initialState = {
	token: '',
};

export default function authentication(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_TOKEN':
			return {
				...state,
				token: action.payload,
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

export const logout = () => ({
	type: 'LOG_OUT',
});
