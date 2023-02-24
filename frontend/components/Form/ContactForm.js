import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Form, InputField, TextAreaField } from './FormControl';

import { toast } from 'react-toastify';
import { email } from './FormControl/validate';

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
			toast.success('Message has been sent successfully');
		}
	}, [isSubmitSuccessful]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid md:grid-cols-2 gap-4 grid-cols-1">
				<InputField
					name="contact.name"
					type="text"
					register={register}
					placeholder="Name"
					icon={<FaUserAlt />}
				/>
				<InputField
					name="contact.email"
					type="email"
					placeholder="Email"
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
				name="contact.message"
				register={register}
				rows="6"
				placeholder="Message"
			/>
			<Button
				type="submit"
				className="lg primary md:max-w-[200px]"
				disabled={isSubmitting}
			>
				{isSubmitting ? <Loader type="submitting" /> : null} Send
				Message
			</Button>
		</Form>
	);
}

export default ContactForm;
