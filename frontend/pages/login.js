import { useRouter } from 'next/router';
import { useState } from 'react';

import LoginForm from '@components/Form/LoginForm';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';

function Login() {
	const router = useRouter();
	const [errors, setErrors] = useState(false);
	const { login } = useAuthContext();

	const onSubmit = (data) => {
		const { email, password } = data;
		return login(email, password)
			.then((res) => {
				console.log('res', res);
			})
			.catch((error) => {
				console.log('error', error);
				setErrors(error.response.data);
			});
	};

	return (
		<div className="bg-primaryLight">
			<div className="container py-14 grid md:grid-cols-2 grid-cols-1 gap-8">
				<LoginForm onSubmit={onSubmit} />
				<div className="flex flex-col items-center justify-center max-md:-order-1">
					{errors && <div className="text-red"></div>}
					<h1>Welcome back</h1>
					<p className="text-center">
						It's nice to see you again. Log in to continue to your
						account.
					</p>
					<Img
						alt="login"
						src="/static/images/girl-cooking-1.png"
						className="w-full h-72 mt-10"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
