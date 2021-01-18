export function calculateCartQty(cart: []) {
	return cart.reduce((acca: any, item: any) => {
		acca += item.quantity;
		return acca;
	}, 0);
}

export function calculateCartTotal(cart: []) {
	return cart.reduce((acca: any, item: any) => {
		acca += item.quantity * item.normalized_price;
		return acca;
	}, 0);
}
