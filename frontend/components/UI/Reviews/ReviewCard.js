import { Form } from '@components/Form/FormControl';
import Rating from '@components/UI/Reviews/Rate';
import { images } from '@utils/constants';
import formatDate from '@utils/formatdate';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import Button from '../Button';
import Img from '../Image';
import Loader from '../Loader';
import ModalPrimary from '../Modal/ModalPrimary';

function ReviewCard({
	id,
	slug,
	user,
	rating,
	date_added,
	title,
	content,
	avatar,
	hasEdit,
	handleDelete,
}) {
	const [showConfirmDeleteteReview, setShowConfirmDeleteReview] =
		useState(false);
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onDelete = async () => {
		await handleDelete(slug, id);
		setShowConfirmDeleteReview(false);
	};
	return (
		<div className="py-5 border-b">
			<ModalPrimary
				show={showConfirmDeleteteReview}
				handleCloseModal={() => setShowConfirmDeleteReview(false)}
			>
				<div className='px-3 pt-4 flex flex-col gap-2'>
					<h3>Are you sure to delete?</h3>
					<Form onSubmit={handleSubmit(onDelete)}>
						<Button
							type="submit"
							className="verify"
						>
							{isSubmitting ? <Loader type="submitting" /> : null}
							Delete
						</Button>
					</Form>
				</div>
			</ModalPrimary>
			<div className="flex gap-4 ">
				<Img
					src={avatar || images.defaultAvatar}
					alt="avatar"
					className="h-16 w-16 rounded-full overflow-hidden "
					cover
				/>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<h3>{user}</h3>
						{hasEdit && (
							<button
								className="text-2xl text-red"
								onClick={() => setShowConfirmDeleteReview(true)}
							>
								<MdDelete />
							</button>
						)}
					</div>
					<div className="flex items-center gap-4">
						<Rating
							number={rating}
							small
						/>
						<span className="text-sm relative top-[1px]">
							{formatDate(date_added)}
						</span>
					</div>
					<span className="capitalize mt-2 block font-semibold text-black">
						{title}
					</span>
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
}

export default ReviewCard;
