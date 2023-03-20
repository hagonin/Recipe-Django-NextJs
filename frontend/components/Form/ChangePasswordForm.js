import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Form, InputField, password } from './FormControl';

function ChangePasswordForm({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors: formErrors, isSubmitting },
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
		reset();
	}, []);

	return (
		<Form
			onSubmit={handleSubmit(({ change_password }) =>
				onSubmit(change_password)
			)}
		>
			<InputField
				label="Old password"
				name="change_password.old_password"
				type="password"
				placeholder="Enter old password"
				icon={<RiLockPasswordLine />}
				register={register}
				error={formErrors?.change_password?.old_password}
				required
				rules={{ required: 'Please enter your password' }}
			/>
			<InputField
				label="New password"
				name="change_password.new_password"
				type="password"
				placeholder="Enter new password"
				icon={<RiLockPasswordLine />}
				register={register}
				error={formErrors?.change_password?.new_password}
				required
				rules={password}
				info={{
					content: (
						<ul className="list-disc">
							<li>Password must be more than 8 characters</li>
							<li>Least one number</li>
							<li>At least one special character</li>
						</ul>
					),
				}}
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
