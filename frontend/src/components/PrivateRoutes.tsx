import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

const ProtectedRoute = (props: any) => {
	const { authentication } = useSelector(
		(authentication: { authentication: any }) => authentication
	);

	return (
		<>
			{!!!authentication.token && <Redirect to="/login" />}
			{props.children}
		</>
	);
};

export default ProtectedRoute;
