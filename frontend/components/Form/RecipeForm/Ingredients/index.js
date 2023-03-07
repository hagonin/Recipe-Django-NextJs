import IngredientGroup from './IngredientGroup';
import IngredientItem from './IngredientItem';

function Ingredients({ control, register, error }) {
	return (
		<div className="flex  flex-col gap-4">
			<IngredientItem
				register={register}
				control={control}
				name={`recipe.ingredient.item`}
				error={error?.item}
			/>
			<IngredientGroup
				register={register}
				control={control}
				name={`recipe.ingredient.group`}
				error={error?.group}
			/>
		</div>
	);
}

export default Ingredients;
