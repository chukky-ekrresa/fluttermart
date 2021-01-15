import MoonLoader from 'react-spinners/MoonLoader';
import styled from 'styled-components';

const Box = styled.div.attrs({
	className: 'fixed left-1/2 top-1/2',
})`
	transform: 'translate(-50%, -50%)';
`;

const Loading = () => {
	return (
		<Box>
			<MoonLoader size={30} color="#F9A109" />
			<p>Loading...</p>
		</Box>
	);
};

export default Loading;
