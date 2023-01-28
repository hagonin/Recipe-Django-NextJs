import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../UI/Button';
import Img from '../UI/Image';
import Field from './Field';
import Loader from '@components/UI/Loader';

import { emailRules, passwordRules } from './Rules';

function SignUpForm({ onSubmit }) {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
	} = useForm();

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center">
				<h1 className="text-center">Register</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center">Welcome. We are glad you are here.</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mt-12"
				noValidate={true}
			>
				<Field
					name="first"
					type="text"
					placeholder="Enter your first name"
					register={register}
				/>

				<Field
					name="last"
					type="text"
					placeholder="Enter your last name"
					register={register}
				/>

				<Field
					name="email"
					type="email"
					placeholder="Enter your email"
					register={register}
					error={errors.email}
					rules={emailRules}
				/>

				<Field
					name="password"
					type="password"
					placeholder="Enter your password"
					register={register}
					error={errors.password}
					rules={passwordRules}
				/>

				<Field
					name="confirm-password"
					type="password"
					placeholder="Confirm Password"
					register={register}
					error={errors['confirm-password']}
					rules={{
						required: 'Confirm password is required',
						validate: (val) =>
							watch('password') === val ||
							'Password does not match',
					}}
				/>

				<div className="my-2">
					<Field
						name="consent"
						type="checkbox"
						labelRight='By clicking "Create Account", I consent to the Privacy Policy.'
						register={register}
						rules={{ required: 'Consent is required' }}
						error={errors.consent}
					/>
				</div>

				<Button
					primary
					type="submit"
					size="lg"
					full
				>
					{isSubmitting && <Loader type="submitting" />}
					Create Account
				</Button>

				<p className="text-center"></p>

				<p className="text-center mt-4">
					Have an account?
					<Link
						href="/login"
						className="ml-2 underline font-semibold hover:text-primary "
					>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default SignUpForm;
