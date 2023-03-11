import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Img from '@components/UI/Image';
import { useRecipeContext } from '@context/recipe-context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { categoryList } from '@utils/constants';
import usePagination from 'hook/usePagination';
import Button from '@components/UI/Button';
import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from 'react-icons/hi';
import Loader from '@components/UI/Loader';

function CategoryPage() {
	const {
		query: { name },
	} = useRouter();
	const { handleToggleBookmark, checkBookmarkAct, recipes } =
		useRecipeContext();
	const [category, setCategory] = useState(null);
	const { nextPage, previousPage, currentRecipes, currentPage, limit } =
		usePagination({ page: 3, recipes: category?.recipes });

	useEffect(() => {
		if (recipes && name) {
			const arr = recipes.filter((recipe) => recipe.category === name);
			const [info] = categoryList.filter((item) => item.name === name);
			return setCategory({ recipes: arr, ...info });
		}
	}, [name, recipes]);
	return (
		<>
			<>
				{category && (
					<div className="border-b border-border pb-5">
						<Img
							src={category.cover}
							alt={category.name}
						/>
						<h1 className="mt-6 capitalize">{category.name}</h1>
						<p className="mt-3">{category.desc}</p>
					</div>
				)}
				<div className="grid">
					{currentRecipes ? (
						currentRecipes.map((recipe) => (
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
						))
					) : (
						<>
							<Loader type="recipe-lg-card" />
						</>
					)}
				</div>

				<div className="flex justify-between mt-10">
					<Button
						icon={{ left: <HiOutlineChevronDoubleLeft /> }}
						onClick={previousPage}
						disabled={currentPage === 1}
					>
						Previous Recipe
					</Button>
					<Button
						icon={{ right: <HiOutlineChevronDoubleRight /> }}
						disabled={currentPage >= limit}
						onClick={nextPage}
					>
						Next recipe
					</Button>
				</div>
			</>
		</>
	);
}

export default CategoryPage;

CategoryPage.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
