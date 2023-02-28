import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import PreviewRecipe from '@components/Recipe/PreviewRecipe';
import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import api from '@services/axios';
import handleResDataForPreView from '@utils/handleResForPreview';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function RecipePreView() {
	const { recipeCurrent, setCurrentRecipe } = useRecipeContext();
	const { token } = useAuthContext();
	const [recipe, setRecipe] = useState(null);
	const { query } = useRouter();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (recipeCurrent) {
			setRecipe(recipeCurrent);
		} else {
			api.get(`/recipe/recipe-detail/${query.slug}`, {
				headers: {
					Authorization: `Bearer ${token.access}`,
				},
			})
				.then((res) => {
					const data = handleResDataForPreView(res);
					console.log(data);
					setRecipe(data);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
		
	}, [recipeCurrent]);

	return (
		<div className="container py-14">
			{loading ? (
				'LOADING...'
			) : recipe ? (
				<PreviewRecipe {...recipe} />
			) : (
				<h2>No preview</h2>
			)}
		</div>
	);
}

export default RecipePreView;
RecipePreView.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
