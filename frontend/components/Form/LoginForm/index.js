import Link from 'next/link';

import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import { CheckboxField, Form, InputField } from '../FormControl';
import Img from '@components/UI/Image';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import VerifyEmail from '../VerifyEmaiForm/VerifyEmailModal';
import { TitlePrimary } from '@components/UI/Title';

function LoginForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		handleSubmit,
		register,
		formState: { errors: formError, isSubmitting },
		setError,
		reset,
	} = useForm();

	useEffect(() => {
		errors?.login?.email &&
			setError('login.email', {
				type: 'custom',
				message: errors?.login?.email,
			});

		errors?.login?.password &&
			setError('login.password', {
				type: 'custom',
				message: errors?.login?.password,
			});
	}, [errors]);

	useEffect(() => {
		setErrors(null);
		reset();
	}, []);

	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 md:px-8 px-4  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center mb-10">
				<TitlePrimary title="Login" />
				<Img
					alt="login_icon"
					src={images.icon1}
					className="md:w-20 md:h-20 w-16 h-16"
				/>
			</div>
			<VerifyEmail />

			<Form onSubmit={handleSubmit(({ login }) => onSubmit(login))}>
				<InputField
					name="login.email"
					type="email"
					placeholder="Enter your email"
					register={register}
					error={formError?.login?.email}
					required
					icon={<MdEmail />}
				/>

				<InputField
					name="login.password"
					type="password"
					placeholder="Enter your password"
					register={register}
					error={formError?.login?.password}
					required
					icon={<RiLockPasswordFill />}
				/>

				<div className="flex justify-between items-center  mb-5 mt-5 ">
					<CheckboxField
						name="login.remember"
						isSingle={{ label: 'Remember me' }}
						register={register}
						error={formError?.login?.remember}
					/>
					<Link
						href="/resetpassword"
						className="md:text-lg text-base font-semibold hover:text-primary relative -top-[3px]"
					>
						Forgot Password?
					</Link>
				</div>
				<Button
					className="primary lg w-full"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader type="submitting" />}
					Login
				</Button>
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
