import { useState } from 'react';
import api from '@services/axios';
import {
	ENDPOINT_RECIPE,
	ENDPOINT_RECIPE_CREATE,
	ENDPOINT_RECIPE_DETAIL,
} from '@utils/constants';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';
import SubscribeSection from '@components/SubcribeSection';
import Reviews from '@components/UI/Reviews';

function Recipe({ recipe }) {
	const {
		isAuthenticated,
		configAuth,
		user,
		handleToggleBookmark,
		checkBookmarkAct,
	} = useAuthContext();
	const { image_url, user: author, slug, reviews, ..._recipe } = recipe;
	const [listReviews, setListReviews] = useState(reviews);
	const relatedRecipes = [
		{
			id: 1,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 2,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 3,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 4,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 5,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
	];

	const handleSubmitReview = async (data) => {
		try {
			const res = await api.post(
				`recipe/${slug}/reviews`,
				{ ...data, avatar: user?.avatar },
				configAuth()
			);
			const review = res?.data;
			toast.success('Your review has been submitted successfully.');
			setListReviews((preReviews) => {
				return [review, ...preReviews];
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (review_slug, id) => {
		await api.delete(`recipe/${slug}/reviews${review_slug}/`, configAuth());
		setListReviews((pre) => {
			const newArr = pre.filter((pre) => pre.id !== id);
			return newArr;
		});
		toast.success('Delete review success');
	};

	return (
		<>
			<SingRecipe
				{..._recipe}
				cover={image_url}
				author={author}
				actBookmark={checkBookmarkAct(recipe.id)}
				handleToggleBookmark={handleToggleBookmark}
			/>
			<Reviews
				isAuth={isAuthenticated}
				onSubmit={handleSubmitReview}
				reviews={listReviews}
				currentUserId={user?.id}
				handleDelete={handleDelete}
			/>

			<SubscribeSection />
			<RelatedRecipe recipes={relatedRecipes} />
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

export async function getStaticProps({ params }) {
	let recipe;
	try {
		const res = await api.get(`${ENDPOINT_RECIPE_CREATE}${params?.slug}/`);
		recipe = res?.data;
	} catch {}
	return {
		props: { recipe },
		revalidate: 5,
	};
}

export async function getStaticPaths() {
	let paths;
	try {
		const res = await api.get(ENDPOINT_RECIPE);
		paths = res?.data?.results.map((item) => ({
			params: {
				slug: item.slug,
			},
		}));
	} catch {}

	return {
		paths,
		fallback: 'blocking',
	};
}
