import { useFieldArray } from 'react-hook-form';

import { MdDelete } from 'react-icons/md';
import Button from '@components/UI/Button';
import { InputField, SelectField } from '../FormControl';

function Ingredients({ control, register }) {
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
						className="grid md:grid-cols-2 grid-cols-1  gap-4"
					>
						<InputField
							type="text"
							placeholder="Name"
							name={`recipe.ingredients.${index}.name`}
							register={register}
						/>
						<InputField
							type="text"
							placeholder="Description"
							name={`recipe.ingredients.${index}.desc`}
							register={register}
						/>
						<InputField
							type="number"
							placeholder="Quantity"
							name={`recipe.ingredients.${index}.quantity`}
							register={register}
						/>
						<InputField
							type="text"
							placeholder="Unit"
							name={`recipe.ingredients.${index}.unit`}
							register={register}
							maxLength={3}
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
