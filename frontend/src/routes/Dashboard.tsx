import { lazy, Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import PrivateRoutes from '../components/PrivateRoutes';
import Loading from '../components/loading';

const NewShop = lazy(() => import('../pages/shop/New'));
const Products = lazy(() => import('../pages/products/'));
const NewProducts = lazy(() => import('../pages/products/New'));

const Dashboard = () => {
	const { path } = useRouteMatch();
	return (
		<PrivateRoutes>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route exact path={`${path}`}>
						<Products />
					</Route>
					<Route exact path={`${path}/new-shop`}>
						<NewShop />
					</Route>
					<Route exact path={`${path}/new-product`}>
						<NewProducts />
					</Route>
				</Switch>
			</Suspense>
		</PrivateRoutes>
	);
};

export default Dashboard;
