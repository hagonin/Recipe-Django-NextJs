import { useRecipeContext } from '@context/recipe-context';
import { useEffect, useState } from 'react';

function RecipePreView() {
	const { recipePreview, setRecipePreview } = useRecipeContext();
	useEffect(() => {
		return () => {
			setRecipePreview(null);
		};
	}, []);
	console.log(recipePreview);
	return <div className="container py-14"></div>;
}

export default RecipePreView;
