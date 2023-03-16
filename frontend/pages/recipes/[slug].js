import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';
import SubscribeSection from '@components/SubcribeSection';
import Reviews from '@components/Reviews';
import { useRecipeContext } from '@context/recipe-context';
import { useRouter } from 'next/router';
import useRecipeBySlug from 'hook/useRecipeBySlug';
import { useEffect } from 'react';
import Loader from '@components/UI/Loader';
import Author from '@components/Recipe/SingleRecipe/Author';
import { images } from '@utils/constants';

function Recipe() {
	const {
		handleToggleBookmark,
		checkBookmarkAct,
		mutateRecipes,
		slugUpdate,
		setSlugUpdate,
	} = useRecipeContext();
	const { configAuth, user } = useAuthContext();
	const router = useRouter();
	const {
		query: { slug },
	} = router;
	const { data, mutate, isLoading } = useRecipeBySlug(router?.query?.slug);

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

	const handleDelete = async (review_slug) => {
		await api.delete(`recipe/${slug}/reviews${review_slug}/`, configAuth());
		await mutate();
		mutateRecipes();
		toast.success('Delete review success');
	};

	const goToLogin = () => router.push('/login');

	useEffect(() => {
		slugUpdate && mutate();
		if (slugUpdate) {
			mutate();
			setSlugUpdate(null);
		}
	}, [slugUpdate]);
	
	return (
		<>
			{isLoading ? (
				<Loader type="single-recipe" />
			) : data ? (
				<>
					<SingRecipe
						{...data}
						cover={data.main_image}
						checkBookmarkAct={checkBookmarkAct}
						handleToggleBookmark={handleToggleBookmark}
					/>
					<SubscribeSection />
					<Author
						name={data?.user}
						avatar={data?.avatar || images.defaultAvatar}
						bio={data?.bio}
					/>
					{data?.category && (
						<RelatedRecipe categoryName={data?.category} />
					)}
					<Reviews
						onSubmit={handleSubmitReview}
						reviews={data.reviews}
						currentUserId={user?.id}
						handleDelete={handleDelete}
						goToLogin={goToLogin}
					/>
				</>
			) : null}
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
