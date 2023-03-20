import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { categoryList, NUMBER_OF_RECIPE_RENDER } from '@utils/constants';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Img from '@components/UI/Image';
import { useRecipeContext } from '@context/recipe-context';
import { usePaginationByApi } from 'hook/usePagination';
import Loader from '@components/UI/Loader';
import { TitlePrimary } from '@components/UI/Title';
import Pagination from '@components/UI/Pagination';
import ShowPages from '@components/UI/Pagination/ShowPages';

function CategoryPage() {
	const {
		query: { name },
	} = useRouter();
	const { handleToggleBookmark, checkBookmarkAct } = useRecipeContext();
	const [category, setCategory] = useState(null);
	const {
		currentPage,
		setCurrentPage,
		pages,
		next,
		previous,
		currentRecipes,
		isLoading,
		mutate,
	} = usePaginationByApi({
		limit: NUMBER_OF_RECIPE_RENDER,
		category: name,
	});

	useEffect(() => {
		if (name) {
			const [info] = categoryList.filter((item) => item.name === name);
			setCategory({ ...info });
			mutate();
		}
	}, [name]);
	return (
		<>
			<>
				{category && (
					<div className="border-b border-border pb-5">
						<Img
							src={category.cover}
							alt={category.name}
							className="h-[400px] w-full mb-6"
							cover
						/>
						<TitlePrimary title={category.name} />
						<p className="mt-3">{category.desc}</p>
					</div>
				)}
				<div className="flex flex-col lg:gap-y-8 gap-y-6 mt-10">
					<ShowPages
						currentPage={currentPage}
						pages={pages}
					/>
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
								className="grid lg:grid-cols-12 lg:gap-6 md:gap-4   grid-cols-1 lg:pb-8  pb-2 border-b items-center"
							/>
						))
					) : (
						<>
							<Loader type="recipe-lg-card" />
						</>
					)}
				</div>

				<Pagination
					next={next}
					previous={previous}
					currentPage={currentPage}
					pages={pages}
					setCurrentPage={setCurrentPage}
				/>
			</>
		</>
	);
}

export default CategoryPage;

CategoryPage.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
