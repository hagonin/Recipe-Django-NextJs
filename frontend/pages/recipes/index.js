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

function Recipe() {
	const { checkBookmarkAct, handleToggleBookmark, recipes } =
		useRecipeContext();
	const { nextPage, previousPage, currentRecipes, currentPage, limit } =
		usePagination({ recipes: recipes });
	return (
		<div className="container my-14">
			<div className="grid grid-cols-3 gap-x-6 gap-y-10">
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
		</div>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
