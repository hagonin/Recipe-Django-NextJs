import { categoryList } from '@utils/constants';
import { useRecipeContext } from '@context/recipe-context';
import { useEffect, useState } from 'react';

import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import SubscribeSection from '@components/SubcribeSection';
import getRandomRecipes from '@utils/getRandomRecipes';

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
				recipes: recipes.filter((recipe) => recipe.category === name),
			}));
			setCategories(arr);

			const randoms = getRandomRecipes(recipes);
			setRandomRecipes(randoms);
		}
	}, [recipes]);

	const recipesRandom = [
		{
			id: 1,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 2,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		},
		{
			id: 3,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		},
		{
			id: 4,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 5,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,  consectetur adipiscing elit Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,  consectetur adipiscing elit.',
		},
		{
			id: 6,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
	];
	return (
		<>
			{randomRecipes && (
				<Slider>
					{randomRecipes.map((recipe, index) => (
						<Slide
							id={recipe.id}
							image={recipe.main_image}
							name={recipe.title}
							description={recipe.description}
							slug={recipe.slug}
							key={index}
						/>
					))}
				</Slider>
			)}

			<SubscribeSection />

			{categories && (
				<WidgetLayout>
					{categories.map(
						(category) =>
							category.recipes.length > 0 && (
								<GroupCategory
									key={category.id}
									list={category.recipes}
									name={category.name}
								/>
							)
					)}
				</WidgetLayout>
			)}
		</>
	);
}
