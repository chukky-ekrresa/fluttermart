import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import Hamburger from './Hamburger';
import Dropdown from './Dropdown';

import logo from '../assets/logo.svg';

const Layout = ({ children }: any) => {
	const authentication = useSelector((state: any) => state.authentication);
	const userDetails = jwt.decode(authentication.token) as any;

	return (
		<div className="w-11/12 mx-auto my-0">
			<div className="border-b border-greyBorder mb-8 py-2 flex justify-between">
				<Link to="/">
					<img src={logo} alt="logo" className="inline-block" />
				</Link>
				<div>
					<Dropdown
						options={[
							...(userDetails?.role === 'vendor'
								? [{ 'My Shops': '/shops' }, { 'Create Shop': '/new-shop' }]
								: []),
							{ 'View Shops': '/' },
							{ Cart: '/cart' },
							{ Checkout: '/checkout' },
							{
								Logout: '/logout',
							},
						]}
						Icon={Hamburger}
						styleClass="right-2 top-7"
					/>
				</div>
			</div>
			{children}
		</div>
	);
};

export default Layout;
