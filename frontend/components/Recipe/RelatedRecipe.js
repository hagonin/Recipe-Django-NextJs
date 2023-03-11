import Slider from '@components/UI/Slider';
import useQuery from 'hook/useQuery';
import RecipeCard from './RecipeCard';

function RelatedRecipe({ categoryName }) {
	const { data: recipes } = useQuery(6, { category: categoryName });
	return (
		<div className="mt-10">
			<span className="uppercase border-b border-border">
				You may also like
			</span>
			{recipes && (
				<Slider>
					{recipes.map((recipe) => {
						return (
							<RecipeCard
								key={recipe.id}
								main_image={recipe.main_image}
								name={recipe.title}
								smallCard
								date={recipe.created_at || recipe.updated_at}
								className="keen-slider__slide mb-10"
							/>
						);
					})}
				</Slider>
			)}
		</div>
	);
}

export default RelatedRecipe;
