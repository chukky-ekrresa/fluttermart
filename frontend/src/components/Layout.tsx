import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import Dropdown from './Dropdown';

const Layout = ({ children }: any) => {
	return (
		<div className="w-11/12 mx-auto my-0">
			<div className="border-b border-greyBorder mb-8 py-2 flex justify-between">
				<Link to="/">Home</Link>
				<div>
					<Dropdown
						options={[
							{ Shops: '/shops' },
							{ Cart: '/cart' },
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
