import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import sleep from '@utils/sleep';
import toastMessage from '@utils/toastMessage';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { Form, InputField } from './FormControl';
import { email } from './FormControl/validate';

function SubscribeForm({ secondary, third }) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors, isSubmitSuccessful },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		return sleep(2000, data)
			.then((data) => {
				toastMessage({
					message: 'Thank you for subscribing',
				});
			})
			.catch();
	};

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [isSubmitSuccessful]);

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className={`flex  ${
				secondary || third ? '' : 'lg:w-[450px]'
			} md:gap-4 gap-2 max-md:flex-col max-md:w-full max-md:mt-3 md:flex-row ${
				third ? '!flex-col' : ''
			}`}
		>
			<InputField
				name="subscribe.email"
				placeholder="Enter your email address"
				register={register}
				type="email"
				rules={{ required: true, pattern: email }}
				error={errors?.subscribe?.email}
			/>
			<Button
				className={`lg primary`}
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? <Loader type="submitting" /> : null}
				Subscribe
			</Button>
		</Form>
	);
}

export default SubscribeForm;
