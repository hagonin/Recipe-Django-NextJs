import { useFieldArray } from 'react-hook-form';

import Button from '@components/UI/Button';
import { InputField, SelectField } from '../FormControl';
import { EXIST_RECIPE, unit } from '@utils/constants';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function Ingredients({ control, register, error }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'recipe.ingredients',
	});
	return (
		<>
			<ul className="mt-3 flex flex-col gap-4 mb-4">
				{fields.map((item, index) => (
					<li
						key={item.id}
						className="bg-primaryLight p-4 rounded-md lg:flex gap-4 relative"
					>
						<button
							className="text-2xl hover:text-red lg:order-1 absolute top-2 right-2"
							onClick={() => remove(index)}
						>
							<IoIosCloseCircleOutline />
						</button>
						<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
							<InputField
								type="text"
								placeholder="e.g. virgin olive oil "
								name={`recipe.ingredients.${index}.heading`}
								register={register}
								label="Heading (optional)"
							/>
							<InputField
								type="text"
								placeholder=" It’s superior in taste and nutrition."
								name={`recipe.ingredients.${index}.title`}
								register={register}
								label="Title"
								rules={{
									required: 'What is your ingredient?',
								}}
								required
								error={error?.[index]?.title}
							/>
							<InputField
								type="number"
								placeholder="e.g. 1"
								name={`recipe.ingredients.${index}.quantity`}
								register={register}
								label="Quantity"
								min="1"
								rules={{
									required: 'How many quantity do we need?',
								}}
								required
								error={error?.[index]?.quantity}
							/>
							<SelectField
								type="text"
								options={unit}
								name={`recipe.ingredients.${index}.unit`}
								register={register}
								label="Unit"
								error={error?.[index]?.unit}
								required
								rules={{ required: "What's unit" }}
							/>
						</div>
					</li>
				))}
			</ul>
			<Button
				type="button"
				className="border-2 border-primary"
				onClick={() => {
					append({
						recipe: EXIST_RECIPE,
						title: '',
						quantity: '',
						unit: '',
					});
				}}
			>
				+ Add new ingredient
			</Button>
		</>
	);
}

export default Ingredients;
