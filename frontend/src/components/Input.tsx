import styled from 'styled-components';

const StyledInput = styled.input.attrs({
	className:
		'border border-greyBorder outline-none focus:outline-none py-2.5 pl-4 rounded-md w-full',
})``;

type Props = {
	label: string;
	placeholder: string;
	value?: any;
	name: string;
	type: string;
	classStyle?: any;
	error?: string;
	formik?: any;
	onChange: (e: any) => void;
};

const Input = ({
	label,
	placeholder,
	value,
	name,
	onChange,
	type,
	classStyle = {},
	error = '',
	formik,
}: Props) => {
	return (
		<div className="mb-4" style={classStyle}>
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
			{formik.touched[`${name}`] && formik.errors[`${name}`] ? (
				<small className="text-red-500">{formik.errors[`${name}`]}</small>
			) : null}
			<small className="text-red-500">{error}</small>
		</div>
	);
};

export const Select = ({ options = [], label, handleChange, name, defaultValue }: any) => {
	return (
		<div className="mb-4">
			<label className="block text-14 mb-2">{label}</label>
			<select
				onChange={handleChange}
				name={name}
				id={name}
				defaultValue={defaultValue}
				className="border border-greyBorder outline-none focus:outline-none py-2.5 pl-4 rounded-md w-full"
			>
				<option value="">Select Payment Currency</option>

				{options.map(({ value, label }: any, index: number) => (
					<option value={value} key={`${value}-${index}`}>
						{label}
					</option>
				))}
			</select>
		</div>
	);
};
export const TextArea = ({
	label,
	placeholder,
	value,
	name,
	onChange,
	error = '',
	formik,
}: any) => {
	return (
		<div className="mb-4">
			<label className="block text-14 mb-2" htmlFor={name}>
				{label}
			</label>
			<textarea
				className="border border-greyBorder outline-none focus:outline-none py-2.5 pl-4 rounded-md w-full"
				rows={3}
				id={name}
				placeholder={placeholder}
				value={value}
				name={name}
				onChange={onChange}
			></textarea>
			{formik.touched[`${name}`] && formik.errors[`${name}`] ? (
				<small className="text-red-500">{formik.errors[`${name}`]}</small>
			) : null}
			<small className="text-red-500">{error}</small>
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
