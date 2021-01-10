import { lazy, Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import PrivateRoutes from '../components/PrivateRoutes';
import Loading from '../components/loading';

const New = lazy(() => import('../pages/shop/New'));

const Dashboard = () => {
	const { path } = useRouteMatch();
	return (
		<PrivateRoutes>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route exact path={`${path}/new-shop`}>
						<New />
					</Route>
				</Switch>
			</Suspense>
		</PrivateRoutes>
	);
};

export default Dashboard;
