import ConfirmDelete from '@components/Form/ConfirmDelete';
import Rating from '@components/Reviews/Rate';
import { images } from '@utils/constants';
import formatDate from '@utils/formatdate';
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { MdClose } from 'react-icons/md';
import Img from '../UI/Image';

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
				<div>
					<Img
						src={avatar || images.defaultAvatar}
						alt="avatar"
						className="h-12 w-12 rounded-full overflow-hidden border border-border"
						cover
					/>
				</div>
				<div className="flex-1">
					<div className="flex justify-between gap-2">
						<div>
							<span className="font-medium text-base leading-0">
								{user}
							</span>
							<Rating number={rating} />
						</div>
						<div className="flex flex-col items-end">
							<span className="text-sm ">{date_added}</span>
							{hasEdit && (
								<button
									className="text-2xl text-red p-1 hover:underline hover:text-red"
									onClick={() =>
										setShowConfirmDeleteReview(true)
									}
								>
									<MdClose />
								</button>
							)}
						</div>
					</div>
					<span className="first-letter:capitalize block font-medium text-black">
						{title}
					</span>
					<p className="first-letter:uppercase">{content}</p>
				</div>
			</div>
		</div>
	);
}

export default ReviewCard;
