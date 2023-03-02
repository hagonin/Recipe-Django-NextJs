import Rating from '@components/UI/Reviews/Rate';
import { images } from '@utils/constants';
import formatDate from '@utils/formatdate';
import Img from '../Image';

function ReviewCard({ user, rating, date_added, title, content, avatar }) {
	return (
		<div className="py-5 border-b">
			<div className="flex gap-4 items-center">
				<Img
					src={avatar || images.defaultAvatar}
					alt="avatar"
					className="h-44 w-44 rounded-full"
				/>
				<div>
					<h3>{user}</h3>
					<div className="flex items-center gap-4">
						<Rating number={rating} />
						<span className="text-sm relative top-[1px]">
							{formatDate(date_added)}
						</span>
					</div>
				</div>
			</div>
			<span className="mt-2 block font-semibold text-black">{title}</span>
			<p>{content}</p>
		</div>
	);
}

export default ReviewCard;
