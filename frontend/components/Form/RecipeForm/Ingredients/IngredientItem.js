import { useFieldArray } from 'react-hook-form';
import { unit } from '@utils/constants';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import { Error, Label } from '@components/Form/FormControl';
import Button from '@components/UI/Button';

function IngredientItem({ register, control, name, error, exist_recipe }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});
	return (
		<>
			{fields.map((field, index) => {
				return (
					<div
						className="flex gap-2"
						key={field.id}
					>
						<div className="grid grid-cols-12 gap-2 flex-1">
							<div className="md:col-span-8 col-span-12">
								{index === 0 && <Label label="Title" />}

								<input
									className={`text-base px-3 border rounded-md w-full outline-none focus:border-primary h-10 flex-1 ${
										error?.[index]?.title?.message
											? 'border-red'
											: ''
									}`}
									type="text"
									{...register(`${name}.${index}.title`, {
										required: 'Enter title',
									})}
									placeholder="E.g. deseeded and finely chopped"
								/>
								<Error
									error={error?.[index]?.title?.message}
									className="mt-[1px] ml-0 text-sm"
								/>
							</div>
							<div className="md:col-span-2 col-span-6">
								{index === 0 && <Label label="Quantity" />}
								<input
									className={`text-base px-3 border rounded-md w-full outline-none focus:border-primary h-10`}
									type="text"
									placeholder="E.g. 1, ½, 2,..."
									{...register(`${name}.${index}.quantity`)}
								/>
								<Error
									error={error?.[index]?.quantity?.message}
									className="mt-[1px] ml-0 text-sm"
								/>
							</div>
							<div className="md:col-span-2 col-span-6">
								{index === 0 && <Label label="Unit" />}
								<select
									className={`text-base px-3 border rounded-md w-full outline-none focus:border-primary h-10`}
									placeholder="unit"
									{...register(`${name}.${index}.unit`)}
								>
									<option value="">Unit</option>
									{unit.map((u) => (
										<option
											key={u.id}
											value={u.name}
										>
											{u.name}
										</option>
									))}
								</select>
								<Error
									error={error?.[index]?.unit?.message}
									className="mt-[1px] ml-0 text-sm"
								/>
							</div>
						</div>
						<button
							type="button"
							onClick={() => remove(index)}
							className="h-10 hover:text-red"
						>
							<AiOutlineMinusCircle />
						</button>
					</div>
				);
			})}
			<Button
				type="button"
				className="tag w-44"
				onClick={() => append({ recipe: exist_recipe })}
			>
				+ add ingredient
			</Button>
		</>
	);
}

export default IngredientItem;
