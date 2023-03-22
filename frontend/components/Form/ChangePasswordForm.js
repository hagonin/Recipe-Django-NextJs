import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@context/auth-context';
import { RiLockPasswordLine } from 'react-icons/ri';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { Form, InputField, password } from './FormControl';
import { info_recipeform } from './FormControl/info';

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
					content: info_recipeform.password,
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
