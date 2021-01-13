import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from '../components/PrivateRoutes';
import Loading from '../components/loading';
import Layout from '../components/Layout';

const Home = lazy(() => import('../pages/home'));
const NewShop = lazy(() => import('../pages/shop/New'));
const NewProducts = lazy(() => import('../pages/products/New'));
const Cart = lazy(() => import('../pages/cart'));

const Dashboard = () => {
	return (
		<PrivateRoutes>
			<Layout>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/new-shop">
							<NewShop />
						</Route>
						<Route exact path="/new-product">
							<NewProducts />
						</Route>
						<Route exact path="/cart">
							<Cart />
						</Route>
					</Switch>
				</Suspense>
			</Layout>
		</PrivateRoutes>
	);
};

export default Dashboard;
