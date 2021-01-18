const initialState = {
	currProductData: null,
};

export default function products(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_CURRENT_PRODUCT':
			return {
				...state,
				currProductData: action.payload,
			};

		default:
			return state;
	}
}

export const setCurrentProduct = (payload: any) => ({
	type: 'SET_CURRENT_PRODUCT',
	payload,
});
