import LoginForm from '@components/Form/LoginForm';
import Img from '@components/UI/Image';
import { GrStatusGood } from 'react-icons/gr';

function Login() {
	const handleSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className="bg-primaryLight">
			<div className="container py-14 grid md:grid-cols-2 grid-cols-1 gap-8">
				<LoginForm handleSubmit={handleSubmit} />
				<div className="flex flex-col items-center justify-center max-md:-order-1">
					<Img
						alt="login"
						src="/static/images/girl-cooking-1.png"
						className="w-full h-72 mb-10"
					/>
					<h1>Welcome back</h1>
					<p className="text-center">
						It's nice to see you again. Log in to continue to your
						account.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
