import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { InputField } from './FormControl';
import Img from '@components/UI/Image';
import Button from '@components/UI/Button';
import { useAuthContext } from '@context/auth-context';
import Loader from '@components/UI/Loader';

function SignUpForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		handleSubmit,
		register,
		formState: { errors: formError, isSubmitting },
		setError,
		reset,
	} = useForm();

	useEffect(() => {
		errors?.register?.username &&
			setError('register.username', {
				type: 'custom',
				message: errors.register.username,
			});

		errors?.register?.email &&
			setError('register.email', {
				type: 'custom',
				message: errors.register.email,
			});

		errors?.register?.password &&
			setError('register.password', {
				type: 'custom',
				message: errors.register.password,
			});
	}, [errors]);

	useEffect(() => {
		setErrors(null);
		reset();
	}, []);

	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center ">
				<h1 className="text-center">Register</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center mb-10">
				Welcome. We are glad you are here.
			</p>

			<form
				onSubmit={handleSubmit((data) => onSubmit(data.register))}
				className="flex flex-col gap-4"
				noValidate={true}
			>
				<InputField
					name="register.username"
					type="text"
					placeholder="Enter your name"
					register={register}
					error={formError?.register?.username}
				/>

				<InputField
					name="register.firstname"
					type="text"
					placeholder="Enter your first name"
					register={register}
					error={formError?.register?.firstname}
				/>

				<InputField
					name="register.lastname"
					type="text"
					placeholder="Enter your last name"
					register={register}
					error={formError?.register?.lastname}
				/>

				<InputField
					name="register.email"
					type="email"
					placeholder="Enter your email"
					register={register}
					error={formError?.register?.email}
				/>

				<InputField
					name="register.password"
					type="password"
					placeholder="Enter your password"
					register={register}
					error={formError?.register?.password}
				/>

				<Button
					styles={{ primary: true, lgSize: true }}
					className="w-full mt-5"
					type="submit"
				>
					{isSubmitting && <Loader type="submitting" />}
					create account
				</Button>

				<p className="text-center mt-4">
					Have an account?
					<Link
						href="/login"
						className="ml-2 underline font-semibold text-primary "
					>
						Login
					</Link>
				</p>
				<span className="text-sm text-center px-12">
					By clicking "Create Account", I consent to
					<Link
						href="/"
						className="underline text-primary ml-1"
					>
						the Terms of Services
					</Link>{' '}
					and{' '}
					<Link
						href="/"
						className="underline text-primary"
					>
						Privacy Policy
					</Link>
					.
				</span>
			</form>
		</div>
	);
}

export default SignUpForm;
