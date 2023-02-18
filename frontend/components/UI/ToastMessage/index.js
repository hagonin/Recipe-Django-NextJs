function ToastMessage({ message }) {
	return (
		<div className="fixed px-5 py-3 rounded-md border-l-2 border-primary bottom-0 left-5">
			<span>{message}</span>
		</div>
	);
}

export default ToastMessage;
