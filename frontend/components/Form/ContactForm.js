import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';

import { email } from './FormControl/validate';
import { Form, InputField, TextAreaField } from './FormControl';

function ContactForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isSubmitSuccessful, errors, isSubmitted },
	} = useForm();

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid md:grid-cols-2 md:gap-4 gap-2 grid-cols-1">
				<InputField
					label="Name"
					name="contact.name"
					type="text"
					register={register}
					placeholder="Enter your name"
					icon={<FaUserAlt />}
				/>
				<InputField
					label="Email"
					name="contact.email"
					type="email"
					placeholder="Enter your email"
					register={register}
					rules={{
						required: 'Please provide your email',
						pattern: email,
					}}
					error={errors.contact?.email}
					icon={<MdEmail />}
					required
				/>
			</div>
			<TextAreaField
				label="Message"
				name="contact.message"
				register={register}
				rows="6"
				placeholder="Enter your message or any question to us."
			/>
			<Button
				type="submit"
				className="lg primary md:max-w-[230px] mt-4"
				disabled={isSubmitting}
			>
				{isSubmitting ? <Loader type="submitting" /> : null} Send
				Message
			</Button>
		</Form>
	);
}

export default ContactForm;
