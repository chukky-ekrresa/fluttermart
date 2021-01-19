const initialState = {
	data: [],
	shop: null,
};

export default function cart(state = initialState, action: any) {
	switch (action.type) {
		case 'SET_CART_ITEM':
			return {
				...state,
				data: [...state.data, action.payload.data],
				shop: action.payload.shop,
			};

		case 'CHANGE_CART_ITEM_QUANTITY':
			return {
				...state,
				data: state.data.map((product: any) => {
					if (product.id === action.payload.productId) {
						product.quantity = action.payload.quantity;
					}

					return product;
				}),
			};

		case 'REMOVE_CART_ITEM':
			return {
				...state,
				data: state.data.filter((product: any) => product.id !== action.payload.productId),
			};

		case 'SET_EMPTY_CART':
			return {
				...state,
				data: [],
				shop: null,
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

export const removeCartItem = (payload: any) => ({
	type: 'REMOVE_CART_ITEM',
	payload,
});

export const changeCartItemQuantity = (payload: any) => ({
	type: 'CHANGE_CART_ITEM_QUANTITY',
	payload,
});
