import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { InputField, TextAreaField } from './FormControl';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
			toast('Message has been sent successfully');
		}
	}, [isSubmitSuccessful]);

	return (
		<form
			noValidate={true}
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 mt-5"
		>
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
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: 'Email is not valid',
						},
					}}
					error={errors.contact?.email}
					icon={<MdEmail />}
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
			>
				{isSubmitting ? <Loader type="submitting" /> : null} Send
				Message
			</Button>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				transition={Slide}
			/>
		</form>
	);
}

export default ContactForm;
