import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Img from '@components/UI/Image';
import { useRecipeContext } from '@context/recipe-context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { categoryList } from '@utils/constants';

function CategoryPage() {
	const {
		query: { name },
	} = useRouter();
	const { handleToggleBookmark, checkBookmarkAct, recipes } =
		useRecipeContext();

	const [category, setCategory] = useState(null);

	useEffect(() => {
		if (recipes && name) {
			const arr = recipes.filter((recipe) => recipe.category === name);
			const [info] = categoryList.filter((item) => item.name === name);
			return setCategory({ recipes: arr, ...info });
		}
	}, [name, recipes]);
	return (
		<>
			{category && (
				<>
					<div className="border-b border-border pb-5">
						<Img
							src={category.cover}
							alt={category.name}
						/>
						<h1 className="mt-6 capitalize">{category.name}</h1>
						<p className="mt-3">{category.desc}</p>
					</div>
					<div className="grid">
						{category.recipes.map((recipe) => (
							<RecipeCard
								key={recipe.id}
								id={recipe.id}
								name={recipe.title}
								slug={recipe.slug}
								main_image={recipe.main_image}
								date={recipe.updated_at}
								rating={recipe.rating}
								summary={recipe.description}
								bookmark={recipe.total_number_of_bookmarks}
								reviews_count={recipe.reviews_count}
								handleToggleBookmark={handleToggleBookmark}
								actBookmark={checkBookmarkAct(recipe.id)}
								lgCard
								border
								className="grid lg:grid-cols-12 gap-6 grid-cols-1"
							/>
						))}
					</div>
				</>
			)}
		</>
	);
}

export default CategoryPage;

CategoryPage.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
