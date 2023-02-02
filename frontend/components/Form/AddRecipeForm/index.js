import {
	CheckboxField,
	Form,
	InputField,
	RadioField,
	SelectField,
	BtnForm,
	TextAreaField,
	titleRule,
} from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import { MdAdd, MdAddAPhoto, MdLockClock } from 'react-icons/md';
import Ingredients from './Ingredients';

function AddRecipeForm({ onSubmit }) {
	return (
		<Form
			onSubmit={onSubmit}
			initValues={{ a: '' }}
		>
			<div className="flex flex-col gap-4">
				<h2 className="border-b border-primary pb-1 mb-4">
					Recipe Detail
				</h2>
				<div className="flex md:flex-row flex-col gap-4">
					<InputField
						name="recipe-title"
						placeholder="Recipe title"
						type="text"
						// rules={titleRule}
					/>
					<SelectField
						name="category"
						options={[
							{ key: 'Select category', value: '' },
							{ key: 'dinner', value: 0 },
							{ key: 'breakfast', value: 1 },
							{ key: 'lunch', value: 2 },
							{ key: 'fastFood', value: 3 },
						]}
						// rules={{
						// 	required: 'Category is required',
						// }}
					/>
				</div>
				<TextAreaField
					name="recipe-summary"
					placeholder="Summary"
					rows="5"
				/>
				<div className="flex gap-4">
					<InputField
						label="Pre-time (minutes)"
						name="pre-time"
						type="number"
					/>
					<InputField
						label="Cook-time (minutes)"
						name="cook-time"
						type="number"
					/>
					<InputField
						label="Serve (people)"
						name="serve"
						type="number"
					/>
				</div>
				<TextAreaField
					name="recipe-desc"
					placeholder="Description"
					rows="5"
				/>
				{/* <InputField
					name="recipe-image"
					type="file"
				/> */}
				<Button icon={{ left: <MdAddAPhoto /> }}>Add Photo</Button>
			</div>

			<Ingredients />

			<div className="mt-5">
				<h2 className="border-b border-primary pb-1 mb-4">
					Directions
				</h2>
				<Button icon={{ left: <MdAdd /> }}>Add Step</Button>
			</div>
			<TextAreaField
				label="Notes"
				name="recipe-note"
				placeholder="Notes"
				rows="2"
			/>

			<div className="flex gap-4 mt-10">
				<BtnForm label="Add" />
				<BtnForm
					label="Reset"
					type="reset"
				/>
			</div>
		</Form>
	);
}

export default AddRecipeForm;
