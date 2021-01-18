const initialState = {
	data: [],
};

export default function cart(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_CART_ITEM':
			return {
				...state,
				data: [...state.data, action.payload],
			};
		case 'SET_EMPTY_CART':
			return {
				...state,
				data: [],
			};

		default:
			return state;
	}
}

export const setCartItem = (payload: any) => ({
	type: 'SET_CART_ITEM',
	payload,
});
export const setEmptyCart = () => ({
	type: 'SET_EMPTY_CART',
});
