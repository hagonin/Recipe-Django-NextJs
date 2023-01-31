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
					{options.map((item) => (
						<label
							key={item.key}
							className="flex items-center gap-4"
						>
							<input
								id={item.value}
								type="checkbox"
								value={item.value}
								{...register(name, rules)}
								{...props}
							/>
							{item.key}
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
			{options.map((item) => (
				<label key={item.key}>
					<input
						type="radio"
						id={item.value}
						value={item.value}
						{...register(name, rules)}
						{...props}
					/>
					{item.key}
				</label>
			))}
			<Error error={errors[name]?.message} />
		</div>
	);
};

const SelectField = ({
	name,
	label,
	list,
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
				<option>Select options</option>
				{list.map((item) => (
					<option
						value={item.value}
						key={item.key}
					>
						{item.key}
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
