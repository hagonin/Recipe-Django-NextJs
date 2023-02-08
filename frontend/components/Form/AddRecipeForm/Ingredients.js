import { useFieldArray } from 'react-hook-form';

import { MdDelete } from 'react-icons/md';
import Button from '@components/UI/Button';
import { InputField, SelectField } from '../FormControl';

function Ingredients({ control, register }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'recipe.ingredient',
	});
	return (
		<>
			<ul className="mt-3 flex flex-col gap-4 mb-4">
				{fields.map((item, index) => (
					<li
						key={item.id}
						className="flex items-center justify-between gap-4"
					>
						<InputField
							type="text"
							placeholder="Ingredient name"
							name={`recipe.ingredient.${index}.name`}
							register={register}
						/>
						<InputField
							type="number"
							placeholder="Quantity"
							name={`recipe.ingredient.${index}.quantity`}
							register={register}
						/>
						<SelectField
							name={`recipe.ingredient.${index}.unit`}
							options={[
								{
									key: 'Unit',
									value: '',
								},
								{
									key: 'tbsp',
									value: 'tablespoon',
								},
								{
									key: 'cup',
									value: 'cup',
								},
								{
									key: 'gr',
									value: 'gram',
								},
								{
									key: 'ml',
									value: 'mililit',
								},
							]}
							register={register}
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className="text-2xl text-red"
						>
							<MdDelete />
						</button>
					</li>
				))}
			</ul>
			<Button
				type="button"
				onClick={() => {
					append({
						name: '',
						quantity: '',
						unit: '',
					});
				}}
			>
				Add new ingredient
			</Button>
		</>
	);
}

export default Ingredients;
