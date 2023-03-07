const Error = ({ error, className }) => {
	return error ? (
		<span
			className={`block font-semibold mt-2 text-red ml-3 select-none ${className}`}
		>
			{error}
		</span>
	) : null;
};

export default Error;
