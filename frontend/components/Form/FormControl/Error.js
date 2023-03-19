const Error = ({ error, className }) => {
	return error ? (
		<span
			className={`block text-base font-medium text-red ml-3 select-none ${className}`}
		>
			{error}
		</span>
	) : null;
};

export default Error;
