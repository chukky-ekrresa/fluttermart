import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/reducers/auth.reduser';

const Logout = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(logout);
		history.push('/login');
	});

	return null;
};

export default Logout;
