import IngredientGroup from './IngredientGroup';
import IngredientItem from './IngredientItem';

function Ingredients({ control, register, error, exist_recipe }) {
	return (
		<div className="flex  flex-col gap-4">
			<IngredientItem
				register={register}
				control={control}
				name={`recipe.ingredient.item`}
				error={error?.item}
				exist_recipe={exist_recipe}
			/>
			<IngredientGroup
				register={register}
				control={control}
				name={`recipe.ingredient.group`}
				error={error?.group}
				exist_recipe={exist_recipe}
			/>
		</div>
	);
}

export default Ingredients;
