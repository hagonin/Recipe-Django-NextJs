import { useRecipeContext } from '@context/recipe-context';
import { ENDPOINT_RECIPE_DETAIL } from '@utils/constants';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import PreviewRecipe from '@components/Recipe/PreviewRecipe';
import { toast } from 'react-toastify';

function RecipePreView() {
	const { deletePhotoById, fetcher } = useRecipeContext();
	const {
		query: { slug },
	} = useRouter();
	const {
		data: recipe,
		isLoading,
		mutate,
	} = useSWR(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, fetcher);

	const handleDeletePhoto = async (id) => {
		await deletePhotoById(id);
		await mutate();
		toast.success('Delete success');
	};

	return (
		<div className="container py-14">
			{isLoading ? (
				'LOADING...'
			) : recipe ? (
				<PreviewRecipe
					data={{ ...recipe }}
					handleDeletePhoto={handleDeletePhoto}
				/>
			) : (
				<h2>No preview</h2>
			)}
		</div>
	);
}

export default RecipePreView;
RecipePreView.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
