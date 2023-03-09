import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';
import { useForm } from 'react-hook-form';
import { Form } from '../FormControl';

function VerifyEmailForm({ handleEffectAfterResend }) {
	const {
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful },
	} = useForm();
	const { handleResendVerify, user } = useAuthContext();

	const onSubmit = async () => {
		const res = await handleResendVerify({
			email: user?.email || null,
		});
		res !== 400 && handleEffectAfterResend();
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			disabled={isSubmitting}
		>
			<Button
				onClick={handleSubmit(onSubmit)}
				className="mt-2 verify"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Resend verify email
			</Button>
		</Form>
	);
}

export default VerifyEmailForm;
