import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../components/loading';
import Dashboard from './Dashboard';

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const VerifyEmail = lazy(() => import('../pages/verify-email'));

const Routes = () => (
	<Router>
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<Route exact path="/verify-email/:userID">
					<VerifyEmail />
				</Route>

				<Route path="/">
					<Dashboard />
				</Route>
			</Switch>
		</Suspense>
	</Router>
);

export default Routes;
