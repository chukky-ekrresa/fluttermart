import { Provider } from 'react-redux';

import './styles/app.css';

import Routes from './routes';

import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	);
}

export default App;
