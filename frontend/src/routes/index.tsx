import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from '../components/loading';
import Dashboard from './Dashboard';
import Layout from '../components/Layout';

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const VerifyEmail = lazy(() => import('../pages/verify-email'));
const Logout = lazy(() => import('../pages/logout'));
const NotFound = lazy(() => import('../pages/not-found'));
const Cart = lazy(() => import('../pages/cart'));
const Home = lazy(() => import('../pages/home'));
const Product = lazy(() => import('../pages/products/singleProduct'));

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
				<Route exact path="/logout">
					<Logout />
				</Route>

				<Route exact path="/">
					<Layout>
						<Home />
					</Layout>
				</Route>

				<Route exact path="/cart">
					<Layout>
						<Cart />
					</Layout>
				</Route>
				<Route exact path="/product/:productId">
					<Layout>
						<Product />
					</Layout>
				</Route>

				<Route path="/">
					<Dashboard />
				</Route>

				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</Suspense>
	</Router>
);

export default Routes;
