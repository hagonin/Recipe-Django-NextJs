import ReviewForm from '@components/Form/Reviews';

import ReviewCard from './ReviewCard';

function Reviews({
	isAuth,
	reviews = [],
	onSubmit,
	currentUserId,
	handleDelete,
}) {
	console.log(reviews);
	return (
		<div className=" my-10 py-10 px-7 bg-third rounded-md">
			<h1>Reviews ({reviews.length})</h1>
			<div className="mt-5">
				{isAuth ? (
					<ReviewForm onSubmit={onSubmit} />
				) : (
					<>
						<p>
							What do you think of this recipe? Share your
							experience to help others.
						</p>
						<button className="underline font-semibold">
							Login to add rating and review
						</button>
					</>
				)}
			</div>
			<div className="mt-7">
				{reviews.map((review, index) => (
					<ReviewCard
						{...review}
						key={index}
						hasEdit={currentUserId === review.user_id}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}

export default Reviews;
