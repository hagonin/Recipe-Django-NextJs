import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { InputField } from './FormControl';

function ResetPasswordForm({ onSubmit }) {
	const { errors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
	} = useForm();

	useEffect(() => {
		errors?.reset?.email &&
			setError('reset.email', {
				type: 'custom',
				message: errors?.reset?.email,
			});
	}, [errors]);

	return (
		<form
			noValidate={true}
			onSubmit={handleSubmit(({ reset }) => onSubmit(reset))}
			className="flex flex-col gap-4"
		>
			<InputField
				name="reset.email"
				type="email"
				placeholder="Enter email"
				icon={<MdEmail />}
				register={register}
				error={formErrors?.reset?.email}
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

export default ResetPasswordForm;
