import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Form, InputField } from './FormControl';
import Img from '@components/UI/Image';
import Button from '@components/UI/Button';
import { useAuthContext } from '@context/auth-context';
import Loader from '@components/UI/Loader';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import VerifyEmail from './VerifyEmaiForm/VerifyEmailModal';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import { images } from '@utils/constants';

function SignUpForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		handleSubmit,
		register,
		formState: { errors: formError, isSubmitting, isSubmitSuccessful },
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
		errors?.register?.confirm_password &&
			setError('register.confirm_password', {
				type: 'custom',
				message: errors.register.confirm_password,
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

			{errors?.register?.['non_field_errors'] ? (
				<span className="block text-center px-5 py-2 mb-7 bg-redLight text-red rounded-md ">
					{errors?.register?.['non_field_errors']}
				</span>
			) : null}

			{isSubmitSuccessful ? null : (
				<Form
					onSubmit={handleSubmit((data) => onSubmit(data.register))}
				>
					<InputField
						name="register.username"
						type="text"
						placeholder="Enter your name"
						register={register}
						error={formError?.register?.username}
						required
					/>

					<InputField
						name="register.first_name"
						type="text"
						placeholder="Enter your first name"
						register={register}
						error={formError?.register?.first_name}
					/>

					<InputField
						name="register.last_name"
						type="text"
						placeholder="Enter your last name"
						register={register}
						error={formError?.register?.last_name}
					/>

					<InputField
						name="register.email"
						type="email"
						placeholder="Enter your email"
						register={register}
						error={formError?.register?.email}
						required
						icon={<MdEmail />}
					/>

					<InputField
						name="register.password"
						type="password"
						placeholder="Enter your password"
						register={register}
						error={formError?.register?.password}
						required
						icon={<RiLockPasswordFill />}
					/>

					<InputField
						name="register.confirm_password"
						type="password"
						placeholder="Confirm password"
						register={register}
						error={formError?.register?.confirm_password}
						required
						icon={<RiLockPasswordFill />}
					/>

					<Button
						className="primary login w-full mt-5"
						type="submit"
						disabled={isSubmitting}
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
				</Form>
			)}
		</div>
	);
}

export default SignUpForm;
