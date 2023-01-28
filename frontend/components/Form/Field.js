const Field = ({
	name,
	type,
	placeholder,
	labelLeft,
	labelRight,
	error,
	register,
	rules = { required: false },
	...props
}) => {
	return (
		<>
			<div className="flex items-center gap-2">
				{labelLeft && <label htmlFor={name}>{labelLeft}</label>}
				<input
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					{...register(name, rules)}
					className={`${
						!['select', 'checkbox', 'radio'].includes(type) &&
						'w-full border rounded px-5 py-2 outline-none  '
					}  ${
						error
							? 'border-red'
							: 'border-border focus:border-primary'
					}`}
					{...props}
				/>
				{labelRight && <label htmlFor={name}>{labelRight}</label>}
			</div>
			{error && (
				<span className="text-sm leading-[0.25rem] text-red mb-2 ml-3">
					{error.message}
				</span>
			)}
		</>
	);
};

export default Field;
