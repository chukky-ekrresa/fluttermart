import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

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
				<Routes />
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
