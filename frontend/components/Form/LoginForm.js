import Link from 'next/link';

import { images } from '@utils/constants';

import { Form, BtnForm, CheckboxField, InputField } from './FormControl';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';

function LoginForm({ onSubmit }) {
	const { errors } = useAuthContext();

	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center mb-10">
				<h1 className="text-center">Login</h1>
				<Img
					alt="login_icon"
					src={images.icon1}
					className="md:w-20 md:h-20 w-16 h-16"
				/>
			</div>

			{errors?.['non_field_errors'] ? (
				<span className="block text-center px-5 py-2 mb-7 bg-redLight text-red rounded-md ">
					{errors?.['non_field_errors']}
				</span>
			) : null}
			<Form onSubmit={onSubmit}>
				<InputField
					name="email"
					type="email"
					placeholder="Enter your email"
				/>

				<InputField
					name="password"
					type="password"
					placeholder="Enter your password"
				/>

				<div className="flex justify-between items-center  mb-7 mt-5 max-sm:flex-col">
					<CheckboxField
						name="remember"
						isSingle={{ label: 'Remember me' }}
					/>
					<Link
						href="/resetpassword"
						className="font-semibold hover:text-primary max-sm:mt-2"
					>
						Forgot Password?
					</Link>
				</div>
				<BtnForm label="login" />
			</Form>

			<p className="text-center mt-5">
				Create an account?
				<Link
					href="/signup"
					className="ml-2 underline font-semibold hover:text-primary "
				>
					Register
				</Link>
			</p>
		</div>
	);
}

export default LoginForm;
