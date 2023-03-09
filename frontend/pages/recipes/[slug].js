import { useState } from 'react';
import api from '@services/axios';
import {
	ENDPOINT_RECIPE,
	ENDPOINT_RECIPE_CREATE,
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_READ,
} from '@utils/constants';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';
import SubscribeSection from '@components/SubcribeSection';
import Reviews from '@components/UI/Reviews';
import { useRecipeContext } from '@context/recipe-context';
import { useRouter } from 'next/router';
import useRecipeBySlug from 'hook/useRecipeBySlug';

function Recipe() {
	const router = useRouter();
	const {
		query: { slug },
	} = router;
	const { data, mutate, isLoading } = useRecipeBySlug(router?.query?.slug);
	const { configAuth, user } = useAuthContext();
	const { handleToggleBookmark, checkBookmarkAct, mutateRecipes } =
		useRecipeContext();

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
			await api.post(
				`recipe/${slug}/reviews`,
				{ ...data, avatar: 'a' },
				configAuth()
			);
			await mutate();
			mutateRecipes();
			toast.success('Your review has been submitted successfully.');
		} catch {}
	};

	// const confirmDelete = (review_slug);

	const handleDelete = async (review_slug) => {
		await api.delete(`recipe/${slug}/reviews${review_slug}/`, configAuth());
		await mutate();
		mutateRecipes();
		toast.success('Delete review success');
	};
	const goToLogin = () => router.push('/login');
	return (
		<>
			{isLoading ? (
				'Loading'
			) : data ? (
				<>
					<SingRecipe
						{...data}
						checkBookmarkAct={checkBookmarkAct}
						handleToggleBookmark={handleToggleBookmark}
					/>
					<Reviews
						onSubmit={handleSubmitReview}
						reviews={data.reviews}
						currentUserId={user?.id}
						handleDelete={handleDelete}
						goToLogin={goToLogin}
					/>
				</>
			) : null}

			<SubscribeSection />
			<RelatedRecipe recipes={relatedRecipes} />
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
