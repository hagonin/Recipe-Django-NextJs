import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import sleep from '@utils/sleep';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InputField } from './FormControl';
import { email } from './FormControl/validate';

function SubscribeForm({ secondary }) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isSubmitSuccessful },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		return sleep(2000, data)
			.then((data) => {
				console.log(data);
				toast.success('Thank you for subscribing');
			})
			.catch();
	};

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [isSubmitSuccessful]);

	return (
		<form
			className={`flex ${
				secondary ? 'flex-col' : ''
			} md:gap-4 gap-2 max-md:flex-col max-md:w-full max-md:mt-3 `}
			noValidate={true}
			onSubmit={handleSubmit(onSubmit)}
		>
			<InputField
				name="subscribe.email"
				placeholder="Your email address"
				register={register}
				type="email"
				rules={{ required: true, pattern: email }}
				error={errors?.subscribe?.email}
			/>
			<Button
				className={`${secondary ? '' : 'primary'} lg`}
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? <Loader type="submitting" /> : null}
				Subscribe
			</Button>
		</form>
	);
}

export default SubscribeForm;
