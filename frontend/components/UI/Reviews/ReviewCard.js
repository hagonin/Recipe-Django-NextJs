import Rating from '@components/UI/Reviews/Rate';
import { images } from '@utils/constants';
import formatDate from '@utils/formatdate';
import { MdDelete } from 'react-icons/md';
import Img from '../Image';

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
	return (
		<div className="py-5 border-b">
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
								onClick={() => handleDelete(slug, id)}
							>
								<MdDelete />
							</button>
						)}
					</div>
					<div className="flex items-center gap-4">
						<Rating number={rating} />
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
