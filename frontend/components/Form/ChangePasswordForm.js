import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiLockPasswordLine } from 'react-icons/ri';
import { InputField } from './FormControl';

function ChangePasswordForm({ onSubmit }) {
	const { errors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		// errors?.change_password?.password &&
		// 	setError('change_password.password', {
		// 		type: 'custom',
		// 		message: errors?.change_password?.password,
		// 	});
	}, [errors]);

	return (
		<form
			noValidate={true}
			onSubmit={handleSubmit(({ change_password }) =>
				onSubmit(change_password)
			)}
			className="flex flex-col gap-4"
		>
			<InputField
				name="change_password.password"
				type="password"
				placeholder="Enter password"
				icon={<RiLockPasswordLine />}
				register={register}
				error={formErrors?.change_password?.password}
			/>
			<Button
				className="lg w-full primary"
				type="submit"
			>
				{isSubmitting && <Loader type="submitting" />}
				Reset
			</Button>
		</form>
	);
}

export default ChangePasswordForm;
