import { combineReducers } from 'redux';

import authentication from './auth.reduser';
import products from './products.reducer';

export default combineReducers({
	authentication,
	products,
});
