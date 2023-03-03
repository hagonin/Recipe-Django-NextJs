import CommentCard from '@components/Comment/CommentCard';

function Comments({ comment_list }) {
	return (
		<div className="flex flex-col gap-8">
			{comment_list.map(({ comments, id, ..._comment }) => {
				return (
					<div key={id}>
						{<CommentCard {..._comment} />}
						<div className="ml-10 flex flex-col gap-8">
							{comments.map((comment) => (
								<CommentCard
									key={comment.id}
									{...comment}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Comments;
