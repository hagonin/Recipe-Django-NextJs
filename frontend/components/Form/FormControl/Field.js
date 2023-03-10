import { useAuthContext } from '@context/auth-context';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import 'react-quill/dist/quill.snow.css';
import Error from './Error';
import Label from './Label';
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
	info,
	required,
	...props
}) => {
	const { setErrors, errors } = useAuthContext();
	return (
		<div className={`w-full ${hide ? 'hidden' : 'block'} `}>
			<Label
				label={label}
				name={name}
				info={info}
				required={required}
			/>
			<div
				className={`w-full flex bg-white px-4 ${
					type !== 'file' && 'border rounded'
				} h-10 outline-none ${
					error
						? 'border-red border'
						: 'border-border focus-within:border-primary focus-within:border-1'
				} `}
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
					className={`text-base w-full border-none outline-none flex-1 bg-transparent pr-3 `}
				/>
				{icon && (
					<span className="text-primary flex items-center justify-center">
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
	info,
	...props
}) => {
	return (
		<div>
			<Label
				label={label}
				name={name}
			/>
			{isSingle.label ? (
				<label className="flex items-center gap-4 mb-2 text-lg">
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
				required={required}
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

const SelectField = ({
	name,
	label,
	options = [],
	register,
	error,
	info,
	rules,
	required,
	...props
}) => {
	return (
		<div className="w-full ">
			<Label
				label={label}
				name={name}
				required
			/>
			<select
				id={name}
				{...register(name, { ...rules })}
				{...props}
				className={`text-base capitalize w-full px-5 h-10 border outline-none rounded ${
					error
						? 'border-red border-1'
						: 'border-border focus:border-primary focus:border-1'
				}`}
			>
				<option value="">Select option</option>
				{options.map((option) => (
					<option
						value={option.name}
						key={option.name}
					>
						{option.name}
					</option>
				))}
			</select>
			<Error error={error?.message} />
		</div>
	);
};

const TextAreaField = ({
	label,
	name,
	register,
	error,
	info,
	required,
	...props
}) => {
	return (
		<div className="flex flex-col w-full">
			<Label
				label={label}
				name={name}
				required={required}
			/>
			<textarea
				id={name}
				{...register(name)}
				{...props}
				className={`text-base w-full border rounded px-5 py-2 outline-none ${
					error ? 'border-red' : 'border-border focus:border-primary'
				}`}
			/>
			<Error error={error?.message} />
		</div>
	);
};

const RichTextField = forwardRef(
	({ field, label, required, info, ...props }, ref) => (
		<div className="flex flex-col h-[250px] !text-base">
			<Label
				label={label}
				info={info}
			/>
			<ReactQuill
				theme="snow"
				{...field}
				ref={ref}
				className="h-[70%]"
				{...props}
			/>
		</div>
	)
);

export {
	InputField,
	CheckboxField,
	RadioField,
	SelectField,
	TextAreaField,
	RichTextField,
};
