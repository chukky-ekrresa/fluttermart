import { combineReducers } from 'redux';

import authentication from './auth.reduser';
import products from './products.reducer';
import cart from './cart.reducer';

export default combineReducers({
	authentication,
	products,
	cart,
});
