import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoutes from '../components/PrivateRoutes';
import Loading from '../components/loading';
import Layout from '../components/Layout';

const Home = lazy(() => import('../pages/home'));
const NewShop = lazy(() => import('../pages/shop/New'));
const NewProducts = lazy(() => import('../pages/products/New'));
const Cart = lazy(() => import('../pages/cart'));
const Checkout = lazy(() => import('../pages/checkout'));
const Shops = lazy(() => import('../pages/shop/'));
const NotFound = lazy(() => import('../pages/not-found'));
const ShopProducts = lazy(() => import('../pages/products/singleShopProducts'));

const Dashboard = () => {
	return (
		<Layout>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/cart">
						<Cart />
					</Route>
					<PrivateRoutes>
						<Route exact path="/new-shop">
							<NewShop />
						</Route>
						<Route exact path="/new-product/:shopId">
							<NewProducts />
						</Route>
						<Route exact path="/shop/products/:shopId">
							<ShopProducts />
						</Route>
						<Route exact path="/checkout">
							<Checkout />
						</Route>
						<Route exact path="/shops">
							<Shops />
						</Route>
					</PrivateRoutes>

					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Suspense>
		</Layout>
	);
};

export default Dashboard;
