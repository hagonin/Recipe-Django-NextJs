import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, InputField, TextAreaField } from '../FormControl';
import Start from './Start';

function ReviewForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful },
		setValue,
		reset,
	} = useForm({defaultValues: {
		avatar: ''
	}});

	const handleChangeStart = (rating) => {
		setValue('review.rating', rating);
	};

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [isSubmitSuccessful]);

	return (
		<Form
			onSubmit={handleSubmit(({ review }) => onSubmit(review))}
			className="bg-white p-5 rounded-md"
		>
			<InputField
				label="Title"
				name="review.title"
				register={register}
				rules={{ required: 'Enter your review title' }}
				placeholder="Enter your "
			/>
			<Start handleChangeStart={handleChangeStart} />
			{}
			<TextAreaField
				label="Your reviews (optional)"
				name={'review.content'}
				register={register}
				rows="3"
			/>
			<Button
				type="submit"
				className="lg primary md:w-52 w-46 ml-auto"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Send Review
			</Button>
		</Form>
	);
}

export default ReviewForm;
