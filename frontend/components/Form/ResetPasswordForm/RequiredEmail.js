import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@context/auth-context';
import { MdEmail } from 'react-icons/md';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { InputField, Form } from '../FormControl';
import { email } from '../FormControl/validate';

function RequiredEmail({ onSubmit }) {
	const { errors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
		reset,
	} = useForm();

	useEffect(() => {
		errors?.required_email?.email &&
			setError('required_email.email', {
				type: 'custom',
				message: errors?.required_email?.email,
			});
	}, [errors]);

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [isSubmitSuccessful]);

	return (
		<>
			<Form
				onSubmit={handleSubmit(({ required_email }) =>
					onSubmit(required_email)
				)}
			>
				<InputField
					name="required_email.email"
					type="email"
					placeholder="Enter email to send request"
					icon={<MdEmail />}
					register={register}
					error={formErrors?.required_email?.email}
					rules={{
						required: true,
						pattern: email,
					}}
					required
				/>
				<Button
					className="lg w-full primary"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader type="submitting" />}
					Send Request
				</Button>
			</Form>
		</>
	);
}

export default RequiredEmail;
