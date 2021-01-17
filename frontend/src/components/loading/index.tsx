import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';

const Box = styled.div.attrs({})`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Loading = () => {
	return (
		<Box>
			<BounceLoader size={100} color="#F9A109" />
		</Box>
	);
};

export default Loading;
