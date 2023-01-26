import LoginForm from '@components/UI/Form/LoginForm';

function Login() {
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className="container">
			<LoginForm onSubmit={onSubmit} />
		</div>
	);
}

export default Login;
