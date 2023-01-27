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
			{({ input, meta }) =>
				(input.onFocus = (
					<>
						<div className="flex items-center gap-2">
							{labelLeft && (
								<label htmlFor={name}>{labelLeft}</label>
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
									'w-full border rounded px-5 py-2 outline-none  '
								}  ${
									meta.error && meta.touched
										? 'border-red'
										: 'border-border focus:border-primary'
								}`}
							/>
							{labelRight && (
								<label htmlFor={name}>{labelRight}</label>
							)}
						</div>
						{meta.error && meta.touched && (
							<span className="text-sm leading-[0.25rem] text-red mb-2 ml-3">
								{meta.error}
							</span>
						)}
					</>
				))
			}
		</Field>
	);
}

export default InputField;
