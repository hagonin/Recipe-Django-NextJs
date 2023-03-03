import Button from '@components/UI/Button';
import { useFieldArray } from 'react-hook-form';
import { InputField, Label } from '../FormControl';

function Instructions({ register, control }) {
	const { fields, append, prepend, remove, swap, move, insert } =
		useFieldArray({
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: 'recipe.instructions', // unique name for your Field Array
		});
	return (
		<div>
			<Label label="Instructions" />

			<ul className='flex flex-col gap-2'>
				{fields.map((field, index) => (
					<li key={field.id}>
                        <span>{`step ${index + 1}`}</span>
						<InputField
							type="text"
							name={`recipe.instructions.${index}`}
							register={register}
							placeholder="step ..."
						/>
					</li>
				))}
			</ul>
			<Button
				className="primary lg mt-4"
				onClick={() => append()}
			>
				+ Add Step
			</Button>
		</div>
	);
}

export default Instructions;
