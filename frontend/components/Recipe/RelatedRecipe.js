import Slider from '@components/UI/Slider';
import RecipeCard from './RecipeCard';

function RelatedRecipe({ recipes }) {
	return (
		<div className="mt-10">
			<span className="uppercase border-b border-border">
				You may also like
			</span>
			<Slider>
				{recipes.map((recipe) => {
					return (
						<RecipeCard
							key={recipe.id}
							{...recipe}
							className="keen-slider__slide grid gap-4"
						/>
					);
				})}
			</Slider>
		</div>
	);
}

export default RelatedRecipe;
