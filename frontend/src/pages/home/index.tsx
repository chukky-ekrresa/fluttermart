import { lazy } from 'react';

const AllShops = lazy(() => import('../../pages/shop/allShops'));

const Home = () => {
	return <AllShops />;
};

export default Home;
