import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useAuthContext } from '@context/auth-context';

import { Form, InputField } from './FormControl';
import Img from '@components/UI/Image';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { TitlePrimary } from '@components/UI/Title';
import {
	email,
	first_name,
	last_name,
	name,
	password,
	user_name,
} from './FormControl/validate';
import { info_recipeform } from './FormControl/info';
import { images } from '@utils/constants';

function SignUpForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		handleSubmit,
		register,
		formState: { errors: formError, isSubmitting },
		setError,
		reset,
		watch,
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
		<>
			<div className="flex justify-center items-center ">
				<TitlePrimary title="Register" />
				<Img
					alt="login_icon"
					src={images.icon1}
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center mb-10">
				Welcome to HomeCook, the perfect place for food lovers!
			</p>
			<Form onSubmit={handleSubmit((data) => onSubmit(data.register))}>
				<div className="flex gap-4 flex-col md:flex-row">
					<InputField
						label="First name"
						name="register.first_name"
						type="text"
						placeholder="Enter your first name"
						register={register}
						error={formError?.register?.first_name}
						rules={first_name}
					/>

					<InputField
						label="Last name"
						name="register.last_name"
						type="text"
						placeholder="Enter your last name"
						register={register}
						error={formError?.register?.last_name}
						rules={last_name}
					/>
				</div>

				<InputField
					label="Username"
					name="register.username"
					type="text"
					placeholder="Enter your name"
					register={register}
					error={formError?.register?.username}
					required
					rules={user_name}
				/>

				<InputField
					label="Email"
					name="register.email"
					type="email"
					placeholder="Enter your email"
					register={register}
					error={formError?.register?.email}
					required
					icon={<MdEmail />}
					rules={email}
				/>

				<InputField
					label="Password"
					name="register.password"
					type="password"
					placeholder="Enter your password"
					register={register}
					error={formError?.register?.password}
					required
					icon={<RiLockPasswordFill />}
					rules={password}
					info={{
						content: info_recipeform.password,
					}}
				/>

				<InputField
					label="Confirm password"
					name="register.confirm_password"
					type="password"
					placeholder="Enter confirm password"
					register={register}
					error={formError?.register?.confirm_password}
					required
					icon={<RiLockPasswordFill />}
					rules={{
						required: 'Please enter your confirm password',
						validate: (val) => {
							if (watch('register.password') != val) {
								return 'Your passwords do no match';
							}
						},
					}}
				/>

				<Button
					className="primary lg w-full mt-5"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader type="submitting" />}
					create an account
				</Button>

				<p className="text-center text-lg">
					Already have an account?
					<Link
						href="/login"
						className="ml-2 underline font-medium text-primaryDark "
					>
						Login
					</Link>
				</p>
				<span className="lg:text-base text-base text-center ">
					By clicking "Create Account", I consent to
					<Link
						href="/"
						className="underline text-primary mx-1"
					>
						the Terms of Services
					</Link>
					and
					<Link
						href="/"
						className="underline text-primary mx-1"
					>
						Privacy Policy
					</Link>
					.
				</span>
			</Form>
		</>
	);
}

export default SignUpForm;
