function getAverageReviews(reviews = [], count_reviews) {
	const totalReviews = reviews.reduce(
		(total, item) => (total = total + item.rating),
		0
	);
	const average = Number((totalReviews / count_reviews).toFixed(1));
	return average;
}

export default getAverageReviews;
