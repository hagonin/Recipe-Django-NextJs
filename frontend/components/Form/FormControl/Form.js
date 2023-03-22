function Form({ onSubmit, children, className }) {
	return (
		<form
			noValidate={true}
			onSubmit={onSubmit}
			className={`flex flex-col gap-3 ${className}`}
		>
			{children}
		</form>
	);
}

export default Form;
