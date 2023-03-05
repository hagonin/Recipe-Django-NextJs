import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
	ENDPOINT_RECIPE_CREATE,
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_READ,
} from '@utils/constants';
import { useRecipeContext } from '@context/recipe-context';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import PreviewRecipe from '@components/Recipe/PreviewRecipe';

function RecipePreView() {
	const { deletePhotoById, fetcher, setLoading, deleteRecipe } =
		useRecipeContext();
	const router = useRouter();
	const {
		query: { slug },
	} = router;
	const {
		data: recipe,
		isLoading,
		mutate,
		isValidating,
	} = useSWR(`${ENDPOINT_RECIPE_READ}${slug}/`, fetcher);

	const handleDeletePhoto = async (id) => {
		await deletePhotoById(id);
		await mutate();
		toast.success('Delete success');
	};

	const goToUpload = () =>
		router.push(`/user/recipe/${recipe?.slug}/upload_image/${recipe?.id}`);

	const goToUpdate = () => {
		router.push(`/user/recipe/${recipe?.slug}/update`);
	};
	const handleDeleteRecipe = async (slug) => {
		try {
			await deleteRecipe(slug);
			await mutate(null);
			router.push('/user/profile');
			toast.success('Delete success');
		} catch (err) {
			toast.error('Delete failed');
		}
	};

	return (
		<div className="container py-14">
			{isLoading || isValidating ? (
				'LOADING...'
			) : recipe ? (
				<PreviewRecipe
					data={{ ...recipe }}
					handleDeletePhoto={handleDeletePhoto}
					goToUpload={goToUpload}
					goToUpdate={goToUpdate}
					gotoDelete={handleDeleteRecipe}
				/>
			) : (
				<h2>No preview</h2>
			)}
		</div>
	);
}

export default RecipePreView;
RecipePreView.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
