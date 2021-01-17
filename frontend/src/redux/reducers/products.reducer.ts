const initialState = {
	cart: [],
	currProductData: null,
};

export default function products(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_CART_ITEM':
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case 'SET_CURRENT_PRODUCT':
			return {
				...state,
				currProductData: action.payload,
			};

		default:
			return state;
	}
}

export const setCartItem = (payload: any) => ({
	type: 'SET_CART_ITEM',
	payload,
});
export const setCurrentProduct = (payload: any) => ({
	type: 'SET_CURRENT_PRODUCT',
	payload,
});
