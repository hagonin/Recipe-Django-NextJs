import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useAuthContext } from '@context/auth-context';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { InputField } from '../FormControl';
import Form from '../FormControl/Form';

function ResetPassword({ onSubmit }) {
	const { errors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors: formErrors, isSubmitting },
	} = useForm();

	useEffect(() => {
		errors?.reset?.password &&
			setError('reset.password', {
				type: 'custom',
				message: errors?.reset?.password,
			});
	}, [errors]);

	return (
		<Form onSubmit={handleSubmit(({ reset }) => onSubmit(reset))}>
			<InputField
				name="reset.password"
				type="password"
				placeholder="Enter new password"
				icon={<RiLockPasswordFill />}
				register={register}
				error={formErrors?.reset?.password}
				required
				rules={{
					minLength: {
						value: 8,
						message: 'Ensure this field has at least 8 characters.',
					},
				}}
			/>

			<Button
				className="lg w-full primary"
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Reset
			</Button>
		</Form>
	);
}

export default ResetPassword;
