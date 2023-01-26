import { Field } from 'react-final-form';

function InputField({
	name,
	type,
	placeholder,
	labelLeft,
	labelRight,
	...props
}) {
	return (
		<Field
			name={name}
			type={type}
		>
			{({ input, meta }) => (
				<>
					<div className="flex items-center gap-2">
						{labelLeft && (
							<label
								htmlFor={name}
								className="whitespace-nowrap"
							>
								{labelLeft}
							</label>
						)}
						<input
							id={name}
							placeholder={placeholder}
							{...input}
							{...props}
							className={`${
								!['select', 'checkbox', 'radio'].includes(
									type
								) &&
								'w-full border rounded-md px-5 py-2 focus:outline-primary '
							}`}
						/>
						{labelRight && (
							<label
								htmlFor={name}
								className="whitespace-nowrap"
							>
								{labelRight}
							</label>
						)}
					</div>
					{meta.error && meta.touched && (
						<span className="text-red-500">{meta.error}</span>
					)}
				</>
			)}
		</Field>
	);
}

export default InputField;
