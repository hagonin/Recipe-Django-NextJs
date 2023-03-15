import CommonSection from '@components/Layouts/SideBar/Widget/CommonSection';
import Loader from '@components/UI/Loader';
import Slider from '@components/UI/Slider';
import { useRecipeContext } from '@context/recipe-context';
import { SLIDES_ON_DESKTOP } from '@utils/constants';
import useQuery from 'hook/useQuery';
import RecipeCard from './RecipeCard';

function RelatedRecipe({ categoryName }) {
	const { data: recipes } = useQuery(10, { category: categoryName });
	const { handleToggleBookmark, checkBookmarkAct } = useRecipeContext();
	return (
		<div className="mt-6">
			<CommonSection
				title="You may also like"
				noBorder
			/>
			{recipes ? (
				<Slider
					slideOnMobile={2}
					smallBtn
				>
					{recipes.map((recipe) => {
						return (
							<RecipeCard
								id={recipe.id}
								actBookmark={checkBookmarkAct(recipe.id)}
								handleToggleBookmark={handleToggleBookmark}
								key={recipe.id}
								main_image={recipe.main_image}
								name={recipe.title}
								slug={recipe.slug}
								rating={recipe.rating}
								reviews_count={recipe.reviews_count}
								smallCard
								date={recipe.created_at || recipe.updated_at}
								className="keen-slider__slide mb-3"
								isSlider
							/>
						);
					})}
				</Slider>
			) : (
				<div className="grid grid-cols-3 md:gap-6 gap-2 mt-5">
					<Loader type="recipe-card" />
					<Loader type="recipe-card" />
					<Loader type="recipe-card" />
				</div>
			)}
		</div>
	);
}

export default RelatedRecipe;
