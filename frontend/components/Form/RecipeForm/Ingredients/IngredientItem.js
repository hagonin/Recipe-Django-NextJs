import { Error } from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import { EXIST_RECIPE, unit } from '@utils/constants';
import { useFieldArray } from 'react-hook-form';
import { IoIosCloseCircleOutline } from 'react-icons/io';

function IngredientItem({ register, control, name, error }) {
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
						<div className="flex gap-2 flex-1">
							<div className="flex flex-col w-full">
								<input
									className={`px-2 border w-full focus:outline-primary h-10 ${
										error?.[index]?.title?.message
											? 'border-red'
											: ''
									}`}
									type="text"
									{...register(`${name}.${index}.title`, {
										required: 'Enter title',
									})}
									placeholder="title"
								/>
								<Error
									error={error?.[index]?.title?.message}
									className="mt-[1px] ml-0 text-sm"
								/>
							</div>
							<div className="flex flex-col w-full">
								<input
									className={`px-2 border w-full focus:outline-primary h-10`}
									type="text"
									placeholder="quantity"
									{...register(`${name}.${index}.quantity`)}
								/>
								<Error
									error={error?.[index]?.quantity?.message}
									className="mt-[1px] ml-0 text-sm"
								/>
							</div>
							<div className="flex flex-col w-full">
								<select
									className={`px-2 border w-full focus:outline-primary h-10`}
									placeholder="unit"
									{...register(`${name}.${index}.unit`)}
								>
									<option value="">Select option</option>
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
							className="h-10"
						>
							<IoIosCloseCircleOutline />
						</button>
					</div>
				);
			})}
			<Button
				type="button"
				className="tag w-44"
				onClick={() => append({ recipe: EXIST_RECIPE })}
			>
				+ add ingredient
			</Button>
		</>
	);
}

export default IngredientItem;
