import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import rootReducer from './redux/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './utils/storage';

const middleware = applyMiddleware(thunk);
const enhancer = composeWithDevTools(middleware);
const persistedState = loadState();
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(
	throttle(() => {
		saveState({
			authentication: store.getState().authentication,
			cart: store.getState().cart,
		});
	}, 1000)
);

export type AppDispatch = typeof store.dispatch;

export default store;
