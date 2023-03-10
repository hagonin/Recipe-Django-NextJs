import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useRecipeContext } from '@context/recipe-context';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import PreviewRecipe from '@components/Recipe/PreviewRecipe';

function RecipePreView() {
	const {
		deletePhotoById,
		deleteRecipe,
		setLoading,
		getRecipeBySlug,
		mutateRecipes,
	} = useRecipeContext();
	const router = useRouter();
	const {
		query: { slug },
	} = router;
	const [recipe, setRecipe] = useState(null);

	const handleDeletePhoto = useCallback(async (id) => {
		await deletePhotoById(id);
		await getRecipeBySlug(slug)
			.then(({ data }) => {
				setRecipe(data);
				toast.success('Delete success');
			})
			.catch();
	});

	const goToUploadPhotos = useCallback(() =>
		router.push(`/user/recipe/${recipe?.slug}/upload_image/${recipe?.id}`)
	);

	const goToUpdate = useCallback(() =>
		router.push(`/user/recipe/${recipe?.slug}/update`)
	);
	const handleDeleteRecipe = useCallback(async (slug) => {
		await deleteRecipe(slug);
		await mutateRecipes();
	});

	useEffect(() => {
		setLoading(true);
		getRecipeBySlug(slug)
			.then(({ data }) => {
				setRecipe({...data});
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
					handleDeletePhoto={handleDeletePhoto}
					goToUpload={goToUploadPhotos}
					goToUpdate={goToUpdate}
					gotoDelete={handleDeleteRecipe}
				/>
			) : null}
		</div>
	);
}

export default RecipePreView;
RecipePreView.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
