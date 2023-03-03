import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Form, InputField } from './FormControl';

function ChangePasswordForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		errors?.change_password?.old_password &&
			setError('change_password.old_password', {
				type: 'custom',
				message: errors?.change_password?.old_password,
			});

		errors?.change_password?.new_password &&
			setError('change_password.new_password', {
				type: 'custom',
				message: errors?.change_password?.new_password,
			});
	}, [errors]);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
			setErrors(null);
		}
	}, [isSubmitSuccessful]);

	return (
		<Form
			onSubmit={handleSubmit(({ change_password }) =>
				onSubmit(change_password)
			)}
		>
			<InputField
				name="change_password.old_password"
				type="password"
				placeholder="Enter old password"
				icon={<RiLockPasswordLine />}
				register={register}
				error={formErrors?.change_password?.old_password}
				required
			/>
			<InputField
				name="change_password.new_password"
				type="password"
				placeholder="Enter new password"
				icon={<RiLockPasswordLine />}
				register={register}
				error={formErrors?.change_password?.new_password}
				required
			/>
			<Button
				className="lg w-full primary"
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Change Password
			</Button>
		</Form>
	);
}

export default ChangePasswordForm;
