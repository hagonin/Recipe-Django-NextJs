import { useAuthContext } from '@context/auth-context';

const InputField = ({
	label,
	name,
	type,
	register,
	error,
	rules = {},
	...props
}) => {
	const { setErrors, errors } = useAuthContext();
	return (
		<div className="w-full">
			<Label
				label={label}
				name={name}
			/>
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
				className={`w-full ${
					type !== 'file' && 'border rounded'
				} px-5 h-12 outline-none ${
					error ? 'border-red' : 'border-border focus:border-primary'
				}`}
			/>
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

export { InputField, CheckboxField, RadioField, SelectField, TextAreaField };
