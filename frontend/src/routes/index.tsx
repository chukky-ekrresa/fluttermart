import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../components/loading';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));

const Routes = () => (
	<Router>
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
			</Switch>
		</Suspense>
	</Router>
);

export default Routes;
