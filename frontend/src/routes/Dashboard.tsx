import { lazy } from 'react';
import { Route } from 'react-router-dom';

import PrivateRoutes from '../components/PrivateRoutes';
import Layout from '../components/Layout';

const NewShop = lazy(() => import('../pages/shop/New'));
const NewProducts = lazy(() => import('../pages/products/New'));
const Checkout = lazy(() => import('../pages/checkout'));
const Shops = lazy(() => import('../pages/shop/'));
// const NotFound = lazy(() => import('../pages/not-found'));
const ShopProducts = lazy(() => import('../pages/products/singleShopProducts'));

const Dashboard = () => {
	return (
		<PrivateRoutes>
			<Route exact path="/new-shop">
				<Layout>
					<NewShop />
				</Layout>
			</Route>
			<Route exact path="/new-product/:shopId">
				<Layout>
					<NewProducts />
				</Layout>
			</Route>
			<Route exact path="/shop/products/:shopId">
				<Layout>
					<ShopProducts />
				</Layout>
			</Route>
			<Route exact path="/checkout">
				<Layout>
					<Checkout />
				</Layout>
			</Route>
			<Route exact path="/shops">
				<Layout>
					<Shops />
				</Layout>
			</Route>

			{/* <Route path="*">
				<NotFound />
			</Route> */}
		</PrivateRoutes>
	);
};

export default Dashboard;
