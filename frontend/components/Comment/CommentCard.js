import Button from '../UI/Button';
import Img from '../UI/Image';

function CommentCard({ name, avatar, date, time, message }) {
	return (
		<div className="flex gap-6 border-t pt-8 border-border ">
			<Img
				src={avatar}
				alt={`avatar of ${name}`}
				className="h-20 w-20 rounded-full overflow-hidden"
			/>
			<div className="flex-1">
				<div className="flex justify-between items-center">
					<div className="flex flex-col">
						<span className="text-base text-black font-medium uppercase">
							{name}
						</span>
						<span className="text-sm ">{`${date} at ${time}`}</span>
					</div>
					<Button className="tag">Reply</Button>
				</div>
				<p className="mt-3">{message}</p>
			</div>
		</div>
	);
}

export default CommentCard;
