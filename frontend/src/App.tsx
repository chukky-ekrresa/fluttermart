import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import CustomToast from './components/Toast';

import './styles/app.css';

import Routes from './routes';

import store from './store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 3600000,
		},
	},
});

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<CustomToast />
				<Routes />
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
