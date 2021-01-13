import { lazy } from 'react';

const Products = lazy(() => import('../../pages/products/index'));

const Home = () => {
	return <Products />;
};

export default Home;
