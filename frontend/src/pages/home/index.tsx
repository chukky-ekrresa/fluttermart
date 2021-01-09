import { Redirect, useLocation } from 'react-router-dom';

const Home = () => {
	const location = useLocation();
	const currentLocation = location.pathname === '/' ? '/login' : location.pathname;

	return <Redirect to={{ pathname: currentLocation }} />;
};

export default Home;
