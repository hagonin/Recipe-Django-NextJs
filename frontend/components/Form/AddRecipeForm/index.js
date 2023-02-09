import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	InputField,
	SelectField,
	TextAreaField,
} from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import RecipeImages from './RecipeImages';
import Ingredients from './Ingredients';
import SearchVector from './SearchVector';

function AddRecipeForm({ onSubmit }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors: formErr },
		reset,
	} = useForm();
	const [recipeImgs, setRecipeImgs] = useState(null);

	useEffect(() => {
		reset();
	}, []);

	return (
		<form
			onSubmit={handleSubmit((data) =>
				onSubmit({ ...data.recipe, images: recipeImgs })
			)}
			noValidate={true}
		>
			<div className="flex flex-col gap-4">
				<Title title="Recipe Detail" />
				<div className="flex md:flex-row flex-col gap-4">
					<InputField
						name="recipe.title"
						placeholder="Recipe title"
						type="text"
						register={register}
						error={formErr?.recipe?.title}
					/>
					<SelectField
						name="recipe.category"
						options={[
							{ key: 'Select category', value: '' },
							{ key: 'dinner', value: 0 },
							{ key: 'breakfast', value: 1 },
							{ key: 'lunch', value: 2 },
							{ key: 'fastFood', value: 3 },
						]}
						register={register}
						error={formErr?.recipe?.category}
					/>
				</div>
				<TextAreaField
					name="recipe.summary"
					placeholder="Summary"
					rows="5"
					register={register}
					error={formErr?.recipe?.summary}
				/>
				<div className="flex gap-4">
					<InputField
						name="recipe.prep_time"
						label="Pre-time (minutes)"
						type="number"
						register={register}
						error={formErr?.recipe?.prep_time}
					/>
					<InputField
						name="recipe.cook_time"
						label="Cook-time (minutes)"
						type="number"
						register={register}
						error={formErr?.recipe?.cook_time}
					/>
					<InputField
						name="recipe.serving"
						label="Serve (people)"
						type="number"
						register={register}
						error={formErr?.recipe?.serving}
					/>
				</div>
				<TextAreaField
					name="recipe.description"
					placeholder="Description"
					rows="5"
					register={register}
					error={formErr?.recipe?.description}
				/>
				<RecipeImages setRecipeImgs={setRecipeImgs} />
			</div>

			<div className="mt-5">
				<Title title="Ingredients" />
				<Ingredients
					control={control}
					register={register}
				/>
			</div>

			<div className="mt-5">
				<Title title="Search Vector" />
				<SearchVector
					control={control}
					register={register}
				/>
			</div>

			<InputField
				name="recipe.source"
				label="Source of recipe"
				type="text"
				register={register}
				error={formErr?.recipe?.source}
			/>

			<div className="flex gap-4 mt-10 justify-center">
				<Button
					className="primary lgSize w-full"
					type="submit"
				>
					Add Recipe
				</Button>
				<Button className="cancle lgSize w-full">cancle</Button>
			</div>
		</form>
	);
}

const Title = ({ title }) => (
	<h2 className="border-b border-primary pb-1 mb-2">{title}</h2>
);
export default AddRecipeForm;
