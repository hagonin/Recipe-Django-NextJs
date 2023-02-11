import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import RecipeCard from '../RecipeCard';
import { images } from '@utils/constants';
import Link from 'next/link';

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
							isSlide
						/>
					);
				})}
			</Slider>
		</div>
	);
}

export default RelatedRecipe;
