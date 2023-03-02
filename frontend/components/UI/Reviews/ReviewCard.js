import Rating from '@components/UI/Reviews/Rate';
import formatDate from '@utils/formatdate';

function ReviewCard({ user, rating, date_added, title, content }) {
	return (
		<div className="py-5 border-b">
			<h3>{user}</h3>
			<div className="flex items-center gap-4">
				<Rating number={rating} />
				<span className="text-sm relative top-[1px]">{formatDate(date_added)}</span>
			</div>
			<span className="mt-2 block font-semibold text-black">{title}</span>
			<p>{content}</p>
		</div>
	);
}

export default ReviewCard;
