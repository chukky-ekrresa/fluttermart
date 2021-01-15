const initialState = {
	cart: [],
};

export default function products(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_CART_ITEM':
			return {
				...state,
				cart: [...state.cart, action.payload],
			};

		default:
			return state;
	}
}

export const setCartItem = (payload: any) => ({
	type: 'SET_CART_ITEM',
	payload,
});
