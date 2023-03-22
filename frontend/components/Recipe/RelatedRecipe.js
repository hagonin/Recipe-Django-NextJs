import { useEffect, useState } from 'react';
import useQuery from 'hook/useQuery';
import { useRecipeContext } from '@context/recipe-context';

import RecipeCard from './RecipeCard';
import Loader from '@components/UI/Loader';
import Slider from '@components/UI/Slider';
import Title from '@components/UI/Title';

function RelatedRecipe({ categoryName, except }) {
	const { data: recipes, isLoading } = useQuery(null, {
		category: categoryName,
	});
	const { handleToggleBookmark, checkBookmarkAct } = useRecipeContext();
	const [recipeRelated, setRecipeRelated] = useState(null);
	useEffect(() => {
		if (recipes) {
			const arr = recipes.filter((item) => item.id !== except);
			setRecipeRelated(arr);
		}
	}, [recipes]);

	return isLoading ? (
		<div className="grid grid-cols-3 md:gap-6 gap-2 mt-5">
			<Loader type="recipe-card" />
			<Loader type="recipe-card" />
			<Loader type="recipe-card" />
		</div>
	) : (
		<div className="mt-9">
			{recipeRelated?.length > 0 ? (
				<>
					<Title
						center
						title="Related recipe"
					/>
					<Slider
						slideOnMobile={2}
						smallBtn
						className="mt-3"
					>
						{recipeRelated.map((recipe) => {
							return (
								<RecipeCard
									id={recipe.id}
									actBookmark={checkBookmarkAct(recipe.id)}
									handleToggleBookmark={handleToggleBookmark}
									key={recipe.id}
									main_image={recipe.main_image}
									name={recipe.title}
									slug={recipe.slug}
									smallCard
									date={
										recipe.created_at || recipe.updated_at
									}
									className="keen-slider__slide mb-3"
									isSlider
								/>
							);
						})}
					</Slider>
				</>
			) : null}
		</div>
	);
}

export default RelatedRecipe;
