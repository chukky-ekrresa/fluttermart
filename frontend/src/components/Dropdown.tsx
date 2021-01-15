import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ options, Icon }: any) => {
	const dropdownRef = useRef<any>();
	const [showDropdown, setShowDropdown] = useState(false);
	const handleClick = (event: any) => {
		if (dropdownRef.current.contains(event.target)) {
			return;
		}
		setShowDropdown(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	return (
		<div className="relative " ref={dropdownRef}>
			<Icon
				style={{ margin: 'auto', cursor: 'pointer' }}
				onClick={() => setShowDropdown(!showDropdown)}
			/>

			<ul
				className={`absolute border border-darkOrange py-4 px-2 w-44 bg-white rounded-md ${
					showDropdown ? '' : 'hidden'
				}`}
			>
				{options.map((item: any, index: number) => (
					<li
						className={`border-b border-lightOrange ${
							index === 0 ? 'pb-2' : 'py-2'
						} cursor-pointer`}
						key={`${Object.values(item)[0]}`}
					>
						<Link to={`${Object.values(item)[0]}`}>{Object.keys(item)[0]}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dropdown;
