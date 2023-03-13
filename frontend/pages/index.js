import { categoryList } from '@utils/constants';
import { useRecipeContext } from '@context/recipe-context';
import { useEffect, useState } from 'react';

import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import SubscribeSection from '@components/SubcribeSection';
import getRandomRecipes from '@utils/getRandomRecipes';
import Loader from '@components/UI/Loader';

export default function Home() {
	const { recipes } = useRecipeContext();
	const [categories, setCategories] = useState(null);
	const [randomRecipes, setRandomRecipes] = useState(null);

	useEffect(() => {
		if (recipes) {
			const arr = categoryList.map(({ id, name, desc }) => ({
				id,
				name,
				desc,
				recipes: recipes
					.filter((recipe) => recipe.category === name)
					.splice(0, 3),
			}));
			setCategories(arr);

			const randoms = getRandomRecipes(recipes);
			setRandomRecipes(randoms);
		}
	}, [recipes]);

	return (
		<>
			{randomRecipes && (
				<Slider>
					{randomRecipes.map((recipe, index) => {
						return (
							<Slide
								id={recipe.id}
								image={recipe.main_image}
								name={recipe.title}
								description={recipe.description}
								slug={recipe.slug}
								key={index}
							/>
						);
					})}
				</Slider>
			)}

			<SubscribeSection />

			<WidgetLayout>
				{categories ? (
					categories.map(
						(category) =>
							category.recipes.length > 0 && (
								<GroupCategory
									key={category.id}
									list={category.recipes}
									name={category.name}
								/>
							)
					)
				) : (
					<div className="flex gap-2">
						<Loader type="recipe-card" />
						<Loader type="recipe-card" />
						<Loader type="recipe-card" />
					</div>
				)}
			</WidgetLayout>
		</>
	);
}
