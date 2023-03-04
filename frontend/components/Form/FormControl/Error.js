const Error = ({ error }) => {
	return error ? (
		<span className="block text-base mt-2 text-red ml-3 select-none">
			{error}
		</span>
	) : null;
};

export default Error;
