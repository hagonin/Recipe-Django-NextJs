import ReviewForm from '@components/Form/Reviews';
import CommonSection from '@components/Layouts/SideBar/Widget/CommonSection';

import ReviewCard from './ReviewCard';

function Reviews({
	reviews = [],
	onSubmit,
	currentUserId,
	handleDelete,
	goToLogin,
}) {
	return (
		<div className=" pt-2 pb-8 px-7 bg-third rounded-md mt-16">
			<CommonSection
				title={`${reviews.length} Comment${
					reviews.length > 1 ? 's' : ''
				} `}
				noBorder
			/>
			<div className="mt-3">
				{currentUserId ? (
					<ReviewForm onSubmit={onSubmit} />
				) : (
					<p>
						What do you think of this recipe? Share your experience
						to help others.
					</p>
				)}
			</div>
			<div className="mt-1">
				{reviews.map((review, index) => (
					<ReviewCard
						{...review}
						id={review?.id}
						user={review?.user?.username}
						avatar={review?.user?.profile?.avatar}
						key={index}
						hasEdit={currentUserId === review?.user?.id}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			<button
				className="hover:underline font-medium mt-5 text-base italic hover:text-primary"
				onClick={goToLogin}
			>
				Login to add rating and review
			</button>
		</div>
	);
}

export default Reviews;
