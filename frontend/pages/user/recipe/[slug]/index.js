import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useRecipeContext } from '@context/recipe-context';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import PreviewRecipe from '@components/Recipe/PreviewRecipe';
import toastMessage from '@utils/toastMessage';
import { STATUS_EXPIRED } from '@utils/constants';

function RecipePreView() {
	const { deleteRecipe, setLoading, getRecipeBySlug, mutateRecipes } =
		useRecipeContext();
	const router = useRouter();
	const {
		query: { slug },
	} = router;
	const [recipe, setRecipe] = useState(null);

	const goToUploadPhotos = useCallback(() =>
		router.push(`/user/recipe/${recipe?.slug}/upload_image/${recipe?.id}`)
	);

	const goToUpdate = useCallback(() =>
		router.push(`/user/recipe/${recipe?.slug}/update`)
	);

	const goToRecipeSingle = useCallback(() =>
		router.push(`/recipes/${recipe?.slug}`)
	);

	const handleDeleteRecipe = useCallback(() => {
		deleteRecipe(recipe?.slug)
			.then(() => {
				toastMessage({
					message: 'Recipe successfully deleted',
				});
				router.push('/user/profile');
			})
			.catch(({ status }) => {
				status === STATUS_EXPIRED &&
					router.push('/user/recipe/request_expired');
			});
	});

	const goToUploadPhoto = useCallback(() =>
		router.push(`/user/recipe/${recipe?.slug}/upload_image/${recipe?.id}`)
	);

	useEffect(() => {
		setLoading(true);
		getRecipeBySlug(slug)
			.then(({ data }) => {
				setRecipe({ ...data });
			})
			.catch()
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className="container py-14">
			{recipe ? (
				<PreviewRecipe
					data={{ ...recipe }}
					goToUpdate={goToUpdate}
					gotoDelete={handleDeleteRecipe}
					goToRecipeSingle={goToRecipeSingle}
					goToUploadPhoto={goToUploadPhoto}
				/>
			) : null}
		</div>
	);
}

export default RecipePreView;
RecipePreView.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
