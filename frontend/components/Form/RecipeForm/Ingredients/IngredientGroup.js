import { useFieldArray } from 'react-hook-form';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import IngredientItem from './IngredientItem';
import { InputField } from '@components/Form/FormControl';
import Button from '@components/UI/Button';

function IngredientGroup({ control, register, name, error, exist_recipe }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});
	return (
		<div className="flex flex-col gap-2">
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="flex flex-col gap-2"
				>
					<div className="flex gap-2 ">
						<div className="w-full">
							<InputField
								label="Heading"
								info={{
									content: (
										<span>
											Put your heading of ingredient
											group, example: sauce, toppings,
											main ingredient, optional ingredient
										</span>
									),
									placement: 'right',
								}}
								name={`${name}.${index}.heading`}
								type="text"
								register={register}
								rules={{ required: 'Enter heading' }}
								placeholder="Heading of ingredient group."
								error={error?.[index]?.heading}
							/>
						</div>
						<button
							type="button"
							onClick={() => remove(index)}
							className="h-10"
						>
							<AiOutlineMinusCircle />
						</button>
					</div>
					<IngredientItem
						register={register}
						control={control}
						name={`${name}.${index}.items`}
						error={error?.[index]?.items}
						exist_recipe={exist_recipe}
					/>
				</div>
			))}
			<Button
				type="button"
				className="tag w-44"
				onClick={() => append({ heading: null })}
			>
				+ Add Heading
			</Button>
		</div>
	);
}

export default IngredientGroup;
