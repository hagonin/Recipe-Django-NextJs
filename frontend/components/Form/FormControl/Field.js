import { useAuthContext } from '@context/auth-context';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(
	() => {
		return import('react-quill');
	},
	{ ssr: false }
);

const InputField = ({
	label,
	name,
	type,
	register,
	error,
	rules = {},
	hide,
	icon,
	...props
}) => {
	const { setErrors, errors } = useAuthContext();
	return (
		<div className={`w-full ${hide ? 'hidden' : 'block'}`}>
			<Label
				label={label}
				name={name}
			/>
			<div
				className={`w-full flex ${
					type !== 'file' && 'border rounded'
				} h-12 outline-none ${
					error ? 'border-red' : 'border-border focus:border-primary '
				}`}
			>
				<input
					id={name}
					type={type}
					{...register(name, {
						onChange: () => {
							errors && setErrors(null);
						},
						...rules,
					})}
					{...props}
					className="border-none outline-none flex-1 px-4 bg-transparent "
				/>
				{icon && (
					<span className="text-primary flex items-center justify-center pr-3">
						{icon}
					</span>
				)}
			</div>

			<Error error={error?.message} />
		</div>
	);
};

const CheckboxField = ({
	label,
	name,
	isSingle = { label: false },
	options,
	register,
	error,
	...props
}) => {
	return (
		<div>
			<Label
				label={label}
				name={name}
			/>
			{isSingle.label ? (
				<label className="flex items-center gap-4 mb-2">
					<input
						id={name}
						type="checkbox"
						{...register(name)}
						{...props}
					/>
					{isSingle.label}
				</label>
			) : (
				<>
					{options.map((option) => (
						<label
							key={option.key}
							className="flex items-center gap-4"
						>
							<input
								id={option.value}
								type="checkbox"
								value={option.value}
								{...register(name)}
								{...props}
							/>
							{option.key}
						</label>
					))}
				</>
			)}
			<Error error={error?.message} />
		</div>
	);
};

const RadioField = ({ name, label, options, register, error, ...props }) => {
	return (
		<div>
			<Label
				label={label}
				name={name}
			/>
			{options.map((option) => (
				<label key={option.key}>
					<input
						type="radio"
						id={option.value}
						value={option.value}
						{...register(name)}
						{...props}
					/>
					{option.key}
				</label>
			))}
			<Error error={error?.message} />
		</div>
	);
};

const SelectField = ({ name, label, options, register, error, ...props }) => {
	return (
		<div className="w-full ">
			<Label
				label={label}
				name={name}
			/>
			<select
				id={name}
				{...register(name)}
				{...props}
				className={`capitalize w-full px-5 h-12 border outline-none rounded ${
					error ? 'border-red' : 'border-border focus:border-primary'
				}`}
			>
				{options.map((option) => (
					<option
						value={option.value}
						key={option.key}
					>
						{option.key}
					</option>
				))}
			</select>
			<Error error={error?.message} />
		</div>
	);
};

const TextAreaField = ({ label, name, register, error, ...props }) => {
	return (
		<div className="flex flex-col">
			<Label
				label={label}
				name={name}
			/>
			<textarea
				id={name}
				{...register(name)}
				{...props}
				className={`w-full border rounded px-5 py-2 outline-none ${
					error ? 'border-red' : 'border-border focus:border-primary'
				}`}
			/>
			<Error error={error?.message} />
		</div>
	);
};

const RichTextField = forwardRef(({ field }, ref) => (
	<div className="flex flex-col h-[400px]">
		<Label label="Description" />
		<ReactQuill
			theme="snow"
			{...field}
			ref={ref}
			className="h-[80%]"
		/>
	</div>
));

const Error = ({ error }) => {
	return error ? (
		<span className="block text-sm mt-2 text-red ml-3">{error}</span>
	) : null;
};

const Label = ({ label, name }) =>
	label && (
		<label
			className="block font-semibold mb-2"
			htmlFor={name}
		>
			{label}
		</label>
	);

export {
	InputField,
	CheckboxField,
	RadioField,
	SelectField,
	TextAreaField,
	RichTextField,
};
