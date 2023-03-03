import Ingredients from '@components/Form/AddRecipeForm/Ingredients';
import { Form, InputField, SelectField } from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { unit } from '@utils/constants';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

function IngredientUpdateForm({ onSubmit, ingredient }) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues: {
			ingredient: ingredient,
		},
	});
	return (
		<Form onSubmit={handleSubmit(({ ingredient }) => onSubmit(ingredient))}>
			<InputField
				type="text"
				placeholder="e.g. virgin olive oil "
				name={`ingredient.title`}
				register={register}
				label="Heading (optional)"
			/>
			<InputField
				type="text"
				placeholder=" It’s superior in taste and nutrition."
				name={`ingredient.desc`}
				register={register}
				label="Description"
				required
			/>
			<InputField
				type="number"
				placeholder="e.g. 1"
				name={`ingredient.quantity`}
				register={register}
				label="Quantity"
				required
			/>
			<SelectField
				type="text"
				options={unit}
				name={`ingredient.unit`}
				register={register}
				label="Unit"
				required
			/>
			<Button
				type="submit"
				className="primary lg"
				disabled={isSubmitting}
			>
				{isSubmitting && <Loader type="submitting" />}
				Save
			</Button>
		</Form>
	);
}

export default memo(IngredientUpdateForm);
