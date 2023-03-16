import { categoryList } from '@utils/constants';
import { useRecipeContext } from '@context/recipe-context';
import { useEffect, useState } from 'react';

import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import SubscribeSection from '@components/SubcribeSection';
import Loader from '@components/UI/Loader';

export default function Home() {
	const { recipes, topRating } = useRecipeContext();
	const [categories, setCategories] = useState(null);

	useEffect(() => {
		if (recipes) {
			let arr = categoryList.map(({ id, name, desc }) => ({
				id,
				name,
				desc,
				recipes: recipes
					.filter((recipe) => recipe.category === name)
					.splice(0, 3),
			}));
			arr = [...arr]
				.sort((a, b) => b.recipes.length - a.recipes.length)
				.splice(0, 6);
			setCategories(arr);
		}
	}, [recipes]);

	return (
		<>
			{topRating && (
				<Slider className='mt-8'>
					{topRating.map((recipe, index) => {
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
						(category, index) =>
							category.recipes.length > 0 && (
								<GroupCategory
									key={category.id}
									list={category.recipes}
									name={category.name}
									hasBorder={index !== 0}
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
