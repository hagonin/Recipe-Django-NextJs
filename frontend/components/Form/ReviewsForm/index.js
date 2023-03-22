import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { Form, InputField, TextAreaField } from '../FormControl';
import Start from './Start';

function ReviewForm({ onSubmit }) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful, errors },
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			review: { avatar: '', rating: 1 },
		},
	});

	const handleChangeStart = (rating) => {
		setValue('review.rating', rating);
	};

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [isSubmitSuccessful]);

	return (
		<Form
			onSubmit={handleSubmit(({ review }) => onSubmit(review))}
			className="bg-white p-5 max-md:px-4 rounded-md !gap-1"
		>
			<InputField
				label="Title"
				name="review.title"
				register={register}
				rules={{ required: 'Enter your review title' }}
				placeholder="Enter your review title"
				error={errors?.review?.title}
				required
			/>
			<Start
				handleChangeStart={handleChangeStart}
				disabled={isSubmitting}
				submitSuccess={isSubmitSuccessful}
			/>
			<TextAreaField
				label="Comment"
				name={'review.content'}
				register={register}
				rows="3"
			/>
			<Button
				type="submit"
				className="lg primary md:w-52 w-46 ml-auto mt-3"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Send Review
			</Button>
		</Form>
	);
}

export default ReviewForm;
