import PreviewRecipe from '@components/Recipe/PreviewRecipe';
import { useRecipeContext } from '@context/recipe-context';
import { images } from '@utils/constants';
import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import { useEffect, useState } from 'react';

function RecipePreView() {
	const { recipePreview, setRecipePreview } = useRecipeContext();
	const [recipe, setRecipe] = useState(null);
	useEffect(() => {
		if (recipePreview) {
			const {
				user: author,
				description: desc,
				instructions: ins,
				image_url: image,
				created_at: cre,
				updated_at: up,
				...rest
			} = recipePreview;
			const description = createMarkup(desc);
			const instructions = createMarkup(ins);
			const created_at = formatDate(cre);
			const updated_at = formatDate(up);
			setRecipe({
				author,
				image,
				description,
				instructions,
				created_at,
				updated_at,
				...rest,
			});
		}
		return () => {
			setRecipePreview(null);
		};
	}, [recipePreview]);

	return (
		<div className="container py-14">
			{recipe ? <PreviewRecipe {...recipe} /> : <h2>No preview</h2>}
		</div>
	);
}

export default RecipePreView;
