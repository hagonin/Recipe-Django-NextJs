import ConfirmDelete from '@components/Form/ConfirmDelete';
import { Form } from '@components/Form/FormControl';
import Rating from '@components/UI/Reviews/Rate';
import { images } from '@utils/constants';
import formatDate from '@utils/formatdate';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegWindowClose } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { MdDelete, MdDeleteSweep } from 'react-icons/md';
import Button from '../Button';
import Img from '../Image';
import Loader from '../Loader';
import ModalPrimary from '../Modal/ModalPrimary';
import Tooltip from '../Tooltip';

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
	const onDelete = async () => {
		await handleDelete(slug, id);
		setShowConfirmDeleteReview(false);
	};
	return (
		<div className="py-5 border-b">
			<ConfirmDelete
				handleDelete={onDelete}
				showConfirm={showConfirmDeleteteReview}
				handleCloseConfirm={() => setShowConfirmDeleteReview(false)}
			/>
			<div className="flex gap-4 ">
				<Img
					src={avatar || images.defaultAvatar}
					alt="avatar"
					className="h-16 w-16 rounded-full overflow-hidden "
					cover
				/>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<h5>{user}</h5>
						{hasEdit && (
							<button
								className="text-xl text-red"
								onClick={() => setShowConfirmDeleteReview(true)}
							>
								<FiDelete />
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
					<span className="capitalize mt-1 block font-medium text-black">
						{title}
					</span>
					<p>{content}</p>
				</div>
			</div>
		</div>
	);
}

export default ReviewCard;
