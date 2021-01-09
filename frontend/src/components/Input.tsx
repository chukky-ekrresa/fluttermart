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
			<label className="block text-14 mb-2" htmlFor={name}>
				{label}
			</label>
			<StyledInput
				id={name}
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
};

type RProps = {
	label: string;
	value: string;
	name: string;
	id: string;
	onChange: (e: any) => void;
};

export const RadioInput = ({ label, value, name, onChange, id }: RProps) => {
	return (
		<span className="mr-4">
			<input className="mr-1" type="radio" id={id} name={name} value={value} onChange={onChange} />
			<label className="capitalize" htmlFor={id}>
				{label}
			</label>
		</span>
	);
};

export default Input;
