import Modal from '@components/UI/Modal';
import Button from '@components/UI/Button';
import { memo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { Form, InputField, SelectField } from '../FormControl';

function Ingredients() {
	const { setValue, getValues, values } = useFormContext();
	const [showForm, setShowForm] = useState(false);
	const onSubmit = (data) => {
		console.log(data);
		console.log(getValues('a'));
		setValue('a', 'b');
	};
	return (
		<div className="mt-5">
			<h2 className="border-b border-primary pb-1 mb-4">Ingredients</h2>
			<Button
				icon={{ left: <MdAdd /> }}
				onClick={() => setShowForm(true)}
			>
				Add Ingredient
			</Button>

			{showForm && (
				<Modal>
					<Form onSubmit={onSubmit}>
						<InputField
							name="ingredient"
							placeholder="Ingredient name"
							type="text"
						/>

						<InputField
							name="quantity"
							placeholder="Ingredient quantity"
							type="number"
							rules={{ required: true }}
						/>

						<SelectField
							name="unit"
							options={[
								{ key: 'gram', value: 'gr' },
								{ key: 'tbsp', value: 'tbsp' },
								{ key: 'ml', value: 'ml' },
								{ key: 'cup', value: 'ml' },
							]}
							rules={{ required: true }}
						/>
						<Button type="submit">Add</Button>
					</Form>
				</Modal>
			)}
		</div>
	);
}

export default memo(Ingredients);
