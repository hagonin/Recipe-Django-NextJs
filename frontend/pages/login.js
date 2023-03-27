import { useRouter } from 'next/router';

import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import LoginForm from '@components/Form/LoginForm';
import Img from '@components/UI/Image';
import { TitlePrimary } from '@components/UI/Title';

function Login() {
	const router = useRouter();

	const { login } = useAuthContext();

	return (
		<div className="bg-primaryLight w-full min-h-screen flex">
			<div className="container m-auto flex md:flex-row flex-col items-center justify-center lg:gap-16 gap-6 py-10">
				<div className=" bg-white md:w-[500px] w-full  rounded-xl pt-6 pb-9 md:px-8 px-4 border md:shadow-xl ">
					<LoginForm onSubmit={login} />
				</div>
				<div className="flex flex-col items-center justify-center max-md:-order-1">
					<Img
						alt="login"
						src={images.login}
						className="w-full md:h-72 h-36 md:mb-10 mb-3"
					/>
					<TitlePrimary title="Welcome back" />
					<p className="text-center ">
						It's nice to see you again <br /> Connect now to save
						and view personalized recipes <br /> Please log
						in to access your account
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
