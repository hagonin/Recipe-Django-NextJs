import { useForm } from 'react-hook-form';
import { useAuthContext } from '@context/auth-context';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { Form } from '../FormControl';

function VerifyEmailForm({ handleEffectAfterResend }) {
	const {
		handleSubmit,
		formState: { isSubmitting },
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
				className="mt-2 verify whitespace-nowrap"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Resend verify email
			</Button>
		</Form>
	);
}

export default VerifyEmailForm;
