import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from 'react-icons/hi';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import { useRecipeContext } from '@context/recipe-context';
import usePagination from 'hook/usePagination';
import Loader from '@components/UI/Loader';
import { NUMBER_OF_RECIPE_RECIPE_PAGE } from '@utils/constants';

function Recipe() {
	const { checkBookmarkAct, handleToggleBookmark, recipes } =
		useRecipeContext();
	const { nextPage, previousPage, currentRecipes, currentPage, limit } =
		usePagination({ recipes: recipes, page: NUMBER_OF_RECIPE_RECIPE_PAGE });
	return (
		<div>
			<h1 className="mb-10 font-serif">Discover all recipes</h1>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 md:gap-y-10 gap-y-6">
				{currentRecipes ? (
					currentRecipes.map((item) => {
						return (
							<RecipeCard
								key={item.id}
								id={item.id}
								slug={item.slug}
								date={item.updated_at}
								name={item.title}
								rating={item.rating}
								main_image={item.main_image}
								cook_time={item.cook_time}
								prep_time={item.prep_time}
								category={item.category}
								summary={item.description}
								reviews_count={item.reviews_count}
								actBookmark={checkBookmarkAct(item.id)}
								handleToggleBookmark={handleToggleBookmark}
								smallCard
							/>
						);
					})
				) : (
					<>
						<Loader type="recipe-card" />
						<Loader type="recipe-card" />
						<Loader type="recipe-card" />
					</>
				)}
			</div>
			{currentRecipes?.length > 0 && (
				<div className="flex justify-between mt-10">
					<Button
						className="disabled"
						icon={{ left: <HiOutlineChevronDoubleLeft /> }}
						onClick={previousPage}
						disabled={currentPage === 1}
					>
						Previous Recipe
					</Button>
					<Button
						className="disabled"
						icon={{ right: <HiOutlineChevronDoubleRight /> }}
						disabled={currentPage >= limit}
						onClick={nextPage}
					>
						Next recipe
					</Button>
				</div>
			)}
		</div>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
