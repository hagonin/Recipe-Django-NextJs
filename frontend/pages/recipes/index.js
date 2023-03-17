import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import { useRecipeContext } from '@context/recipe-context';
import usePagination from 'hook/usePagination';
import Loader from '@components/UI/Loader';
import { NUMBER_OF_RECIPE_RECIPE_PAGE } from '@utils/constants';
import { TitlePrimary } from '@components/UI/Title';
import Pagination from '@components/UI/Pagination';
import ShowPages from '@components/UI/Pagination/ShowPages';

function Recipe() {
	const { checkBookmarkAct, handleToggleBookmark, recipes } =
		useRecipeContext();
	const {
		currentRecipes,
		currentPage,
		pages,
		setCurrentPage,
		next,
		previous,
	} = usePagination({
		recipes: recipes,
		limitPerPage: NUMBER_OF_RECIPE_RECIPE_PAGE,
		total: recipes?.length,
	});
	return (
		<div className="">
			<div className="flex justify-between">
				<TitlePrimary title="Discover all recipes" />
				<ShowPages currentPage={currentPage} pages={pages}/>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 md:gap-y-10 gap-y-6 mt-10">
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
			<Pagination
				pages={pages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				next={next}
				previous={previous}
			/>
		</div>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
