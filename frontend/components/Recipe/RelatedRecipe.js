import Slider from '@components/UI/Slider';
import RecipeCard from './RecipeCard';

function RelatedRecipe({ recipes }) {
	return (
		<div>
			<span className="uppercase border-b border-border relative top-14">
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
