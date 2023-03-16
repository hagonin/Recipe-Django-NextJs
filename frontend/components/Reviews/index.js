import ReviewForm from '@components/Form/ReviewsForm';
import Title from '@components/UI/Title';

import ReviewCard from './ReviewCard';

function Reviews({
	reviews = [],
	onSubmit,
	currentUserId,
	handleDelete,
	goToLogin,
}) {
	return (
		<div className=" pt-4 pb-8 md:px-6 px-4 bg-third rounded-md mt-16">
			<Title
				title={`${reviews.length} Comment${
					reviews.length > 1 ? 's' : ''
				} `}
				center
			/>

			<div className="mb-10">
				{reviews.length > 0
					? reviews.map((review, index) => (
							<ReviewCard
								key={index}
								{...review}
								id={review?.id}
								user={review?.user?.username}
								avatar={review?.user?.profile?.avatar}
								hasEdit={currentUserId === review?.user?.id}
								handleDelete={handleDelete}
								isFirstCard={index === 0}
							/>
					  ))
					: 'There are no reviews yet. Be the first!'}
			</div>
			<div className="mt-3">
				{currentUserId ? <ReviewForm onSubmit={onSubmit} /> : null}
			</div>
			{currentUserId ? null : (
				<div className=" mt-5">
					<p>
						What do you think of this recipe? Share your experience
						to help others.
					</p>
					<button
						className="hover:underline font-medium text-base italic hover:text-primary"
						onClick={goToLogin}
					>
						Login to add rating and review
					</button>
				</div>
			)}
		</div>
	);
}

export default Reviews;
