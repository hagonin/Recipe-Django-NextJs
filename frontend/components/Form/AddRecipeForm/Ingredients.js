import { useFieldArray } from 'react-hook-form';

import { MdDelete } from 'react-icons/md';
import Button from '@components/UI/Button';
import { InputField, SelectField } from '../FormControl';
import { unit } from '@utils/constants';

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
							placeholder="e.g. virgin olive oil "
							name={`recipe.ingredients.${index}.title`}
							register={register}
							label="Heading (optional)"
						/>
						<InputField
							type="text"
							placeholder=" It’s superior in taste and nutrition."
							name={`recipe.ingredients.${index}.desc`}
							register={register}
							label="Description"
							required
						/>
						<InputField
							type="number"
							placeholder="e.g. 1"
							name={`recipe.ingredients.${index}.quantity`}
							register={register}
							label="Quantity"
							required
						/>
						<SelectField
							type="text"
							options={unit}
							name={`recipe.ingredients.${index}.unit`}
							register={register}
							label="Unit"
							required
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
						recipe: 65,
						title: '',
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
