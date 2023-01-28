import { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Button from '../UI/Button';
import Img from '../UI/Image';
import Field from './Field';
import Loader from '@components/UI/Loader';

import { emailRules } from './Rules';

function LoginForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful, isSubmitting },
		reset,
	} = useForm();

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);
	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center">
				<h1 className="text-center">Login</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-16 h-16"
				/>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mt-12"
				noValidate={true}
			>
				<Field
					name="email"
					type="email"
					placeholder="Enter your email"
					register={register}
					rules={emailRules}
					error={errors.email}
				/>

				<Field
					name="password"
					type="password"
					placeholder="Enter your password"
					register={register}
					rules={{
						required: 'Password is required',
					}}
					error={errors.password}
				/>

				<div className="flex justify-between items-center  mb-7 mt-5 max-sm:flex-col">
					<Field
						name="remember"
						type="checkbox"
						labelRight="Remember me"
						register={register}
					/>
					<Link
						href="/resetpassword"
						className="font-semibold hover:text-primary max-sm:mt-2"
					>
						Forgot Password?
					</Link>
				</div>

				<Button
					primary
					full
					size="lg"
					type="submit"
				>
					{isSubmitting && <Loader type="submitting" />}
					Login
				</Button>

				<p className="text-center mt-5">
					Create an account?
					<Link
						href="/signup"
						className="ml-2 underline font-semibold hover:text-primary "
					>
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}

export default LoginForm;
