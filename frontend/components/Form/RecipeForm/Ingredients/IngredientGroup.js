import { Error, InputField } from '@components/Form/FormControl';
import { useFieldArray } from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/md';
import IngredientItem from './IngredientItem';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Button from '@components/UI/Button';

function IngredientGroup({ control, register, name, error }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	});
	return (
		<div className="flex flex-col gap-y-4 ">
			{fields.map((field, index) => (
				<div key={field.id}>
					<div className="flex gap-2 ">
						<div className="w-full">
							<input
								className={`border-b outline-none w-full ${
									error?.[index]?.heading?.message
										? 'border-red'
										: 'border-primary'
								}`}
								type="text"
								{...register(`${name}.${index}.heading`, {
									required: 'Enter heading',
								})}
								placeholder="Heading"
							/>
							<Error
								error={error?.[index]?.heading?.message}
								className="mt-[1px] ml-0 text-sm"
							/>
						</div>
						<button
							type="button"
							onClick={() => remove(index)}
							className='h-10 '
						>
							<IoIosCloseCircleOutline />
						</button>
					</div>
					<IngredientItem
						register={register}
						control={control}
						name={`${name}.${index}.items`}
						error={error?.[index]?.items}
					/>
				</div>
			))}
			<Button
				type="button"
				className="tag"
				onClick={() => append({ heading: null })}
			>
				+ Add Heading
			</Button>
		</div>
	);
}

export default IngredientGroup;
