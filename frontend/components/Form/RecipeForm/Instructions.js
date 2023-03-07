import Button from '@components/UI/Button';
import { useFieldArray } from 'react-hook-form';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { InputField, Label } from '../FormControl';

function Instructions({ register, control, error }) {
	const { fields, append, prepend, remove, swap, move, insert } =
		useFieldArray({
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: 'recipe.instructions', // unique name for your Field Array
		});
	return (
		<div>
			<ul className="flex flex-col gap-2">
				{fields.map((field, index) => (
					<li key={field.id}>
						<span className="mb-1 block">{`Step ${
							index + 1
						}`}</span>
						<div className="flex gap-4 items-center">
							<InputField
								type="text"
								name={`recipe.instructions.${index}.content`}
								register={register}
								placeholder="Slice half of the lemon into rounds and use the other half to squeeze over the chicken,..."
							/>
							<button
								className="text-2xl hover:text-red"
								onClick={() => remove(index)}
							>
								<IoIosCloseCircleOutline />
							</button>
						</div>
					</li>
				))}
			</ul>
			<Button
				className="border-2 border-primary mt-4"
				onClick={() => append()}
			>
				+ Add Step
			</Button>
		</div>
	);
}

export default Instructions;
