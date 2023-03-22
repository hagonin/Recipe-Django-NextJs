import { NUMBER_OF_RECIPE_RENDER } from '@utils/constants';
import usePagination from 'hook/usePagination';

import ReviewForm from '@components/Form/ReviewsForm';
import Pagination from '@components/UI/Pagination';
import Title from '@components/UI/Title';
import ReviewCard from './ReviewCard';

function Reviews({
	reviews = [],
	onSubmit,
	currentUserId,
	handleDelete,
	goToLogin,
	id_scroll
}) {
	const {
		currentRecipes: reviewsCurrent,
		currentPage,
		pages,
		setCurrentPage,
		next,
		previous,
	} = usePagination({
		limitPerPage: NUMBER_OF_RECIPE_RENDER,
		recipes: reviews,
		total: reviews?.length,
		noScroll: true,
	});
	return (
		<div
			className=" pt-4 pb-6 md:px-6 px-4 bg-third rounded-md mt-8"
			id={id_scroll}
		>
			<Title
				title={`${reviews.length} Comment${
					reviews.length > 1 ? 's' : ''
				} `}
				center
			/>

			<div className="mb-3">
				{reviewsCurrent?.length > 0 ? (
					<>
						{reviewsCurrent.map((review, index) => (
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
						))}
						<Pagination
							small
							onlyNumber
							pages={pages}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							next={next}
							previous={previous}
						/>
					</>
				) : (
					'There are no reviews yet. Be the first!'
				)}
			</div>

			{currentUserId ? (
				<ReviewForm onSubmit={onSubmit} />
			) : (
				<div className=" mt-3">
					<p>
						What do you think of this recipe? Share your experience
						to help others.
					</p>
					<button
						className="underline font-medium text-base italic hover:text-primary"
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
