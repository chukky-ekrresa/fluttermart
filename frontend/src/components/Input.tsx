import styled from 'styled-components';

const StyledInput = styled.input.attrs({
	className:
		'border border-greyBorder outline-none focus:outline-none py-2.5 pl-4 rounded-md w-full',
})``;

type Props = {
	label: string;
	placeholder: string;
	value: string;
	name: string;
	type: string;
	onChange: (e: any) => void;
};

const Input = ({ label, placeholder, value, name, onChange, type }: Props) => {
	return (
		<div className="mb-4">
			<label className="block text-14">{label}</label>
			<StyledInput
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;
