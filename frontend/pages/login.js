import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import LoginForm from '@components/Form/LoginForm';
import Img from '@components/UI/Image';

function Login() {
	const { login, handleResendVerify } = useAuthContext();

	return (
		<div className="bg-primaryLight">
			<div className="container py-14 grid md:grid-cols-2 grid-cols-1 gap-8">
				<LoginForm
					onSubmit={login}
					resendVerifyEmail={handleResendVerify}
				/>
				<div className="flex flex-col items-center justify-center max-md:-order-1">
					<h1>Welcome back</h1>
					<p className="text-center">
						It's nice to see you again. Log in to continue to your
						account.
					</p>
					<Img
						alt="login"
						src={images.login}
						className="w-full h-72 mt-10"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
