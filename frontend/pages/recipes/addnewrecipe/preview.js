import PreviewRecipe from '@components/Recipe/PreviewRecipe';
import { useRecipeContext } from '@context/recipe-context';
import { images } from '@utils/constants';
import { useEffect, useState } from 'react';

function RecipePreView() {
	const { recipePreview, setRecipePreview } = useRecipeContext();
	const [recipe, setRecipe] = useState({
		title: 'Recipe Name',
		prep_time: 2,
		cook_time: 4,
		serving: 5,
		author: 'mi22',
		description: 'Desc',
		instructions: 'Step1',
		updated_at: '2023-02-27',
		image: images.spoon,
		category: 'Breakfast',
		ingredients: [
			{
				title: 'onion',
				desc: 'No',
				quantity: 2,
				unit: 'kg',
			},
		],
		notes: 'Notes',
		keyword: 'Search',
		source: 'Sea.com',
	});
	useEffect(() => {
		if (recipePreview) {
			const {
				user: { username: author },
				image_url: image,
				...rest
			} = recipePreview;
			setRecipe({ author, image, ...rest });
			console.log(recipePreview);
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
