import { useFormContext } from 'react-hook-form';

const InputField = ({ label, name, rules = { required: false }, ...props }) => {
	const { register, errors } = useFormContext();
	return (
		<div>
			<Label
				label={label}
				name={name}
			/>
			<input
				id={name}
				{...register(name, rules)}
				className={`w-full border rounded px-5 py-2 outline-none ${
					errors[name]
						? 'border-red'
						: 'border-border focus:border-primary'
				}`}
				{...props}
			/>
			<Error error={errors[name]?.message} />
		</div>
	);
};

const CheckboxField = ({
	name,
	label,
	isSingle = { label: false },
	options,
	rules = { required: false },
	...props
}) => {
	const { register, errors } = useFormContext();
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
						{...register(name, rules)}
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
								{...register(name, rules)}
								{...props}
							/>
							{option.key}
						</label>
					))}
				</>
			)}
			<Error error={errors[name]?.message} />
		</div>
	);
};

const RadioField = ({
	name,
	label,
	options,
	rules = { required: false },
	...props
}) => {
	const { register, errors } = useFormContext();

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
						{...register(name, rules)}
						{...props}
					/>
					{option.key}
				</label>
			))}
			<Error error={errors[name]?.message} />
		</div>
	);
};

const SelectField = ({
	name,
	label,
	options,
	rules = { required: false },
	...props
}) => {
	const { register, errors } = useFormContext();

	return (
		<div>
			<Label
				label={label}
				name={name}
			/>
			<select
				id={name}
				{...register(name, rules)}
				{...props}
			>
				<option value="">Select options</option>
				{options.map((option) => (
					<option
						value={option.value}
						key={option.key}
					>
						{option.key}
					</option>
				))}
			</select>
			<Error error={errors[name]?.message} />
		</div>
	);
};

const TextAreaField = ({ label, name, rules, ...props }) => {
	const { register, errors } = useFormContext();

	return (
		<div>
			<Label
				label={label}
				name={name}
			/>
			<textarea
				id={name}
				{...register(name, rules)}
				{...props}
				className={`w-full border rounded px-5 py-2 outline-none ${
					errors[name]
						? 'border-red'
						: 'border-border focus:border-primary'
				}`}
			/>
			<Error error={errors[name]?.message} />
		</div>
	);
};
const Error = ({ error }) => {
	return error ? (
		<span className="block text-sm mt-2 text-red mb-2 ml-3">{error}</span>
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
