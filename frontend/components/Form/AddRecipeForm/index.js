import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
	InputField,
	SelectField,
	TextAreaField,
	RichTextField,
} from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import RecipeImages from './RecipeImages';
import Ingredients from './Ingredients';
import Images from './Images';
import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-content';

function AddRecipeForm({ onSubmit }) {
	const { categories } = useRecipeContext();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors: formErr },
		reset,
		setValue,
	} = useForm();

	useEffect(() => {
		reset();
	}, []);

	const handleBeforeSubmit = (data) => {
		const {
			recipe: { recipe, ...rest },
		} = data;
		const slug = getSlug(recipe.title);
		return onSubmit({ ...recipe, slug, ...rest });
	};

	const getSlug = (word) => {
		const slug = word.split(' ').join('-');
		return slug;
	};

	return (
		<form
			onSubmit={handleSubmit(handleBeforeSubmit)}
			noValidate={true}
		>
			<div className="flex flex-col gap-4">
				<Title title="Recipe Detail" />
				<div className="flex md:flex-row flex-col gap-4">
					<InputField
						name="recipe.recipe.title"
						placeholder="Recipe title"
						type="text"
						register={register}
						error={formErr?.recipe?.recipe?.title}
					/>
					<InputField
						name="recipe.category"
						placeholder="Category"
						type="text"
						register={register}
						error={formErr?.recipe?.category}
					/>
				</div>
				<div className="flex gap-4">
					<InputField
						name="recipe.recipe.prep_time"
						label="Pre-time (minutes)"
						type="number"
						register={register}
						error={formErr?.recipe?.recipe?.prep_time}
					/>
					<InputField
						name="recipe.recipe.cook_time"
						label="Cook-time (minutes)"
						type="number"
						register={register}
						error={formErr?.recipe?.recipe?.cook_time}
					/>
					<InputField
						name="recipe.recipe.serving"
						label="Serve (people)"
						type="number"
						register={register}
						error={formErr?.recipe?.recipe?.serving}
					/>
				</div>

				<Controller
					name="recipe.recipe.description"
					control={control}
					render={({ field }) => (
						<RichTextField
							field={field}
							label="Description"
						/>
					)}
				/>
				{/* <div>
					<Images
						control={control}
						register={register}
						handleChangeImage={setValue}
					/>
				</div> */}
			</div>

			<div className="mt-5">
				<Title title="Ingredients" />
				<Ingredients
					control={control}
					register={register}
				/>
			</div>

			<div className="flex gap-4 mt-8 mb-4">
				<InputField
					name="recipe.recipe.search_vector"
					label="Search Vector"
					type="text"
					register={register}
					error={formErr?.recipe?.recipe?.search_vector}
				/>

				<InputField
					name="recipe.recipe.source"
					label="Source of recipe"
					type="text"
					register={register}
					error={formErr?.recipe?.recipe?.source}
				/>
			</div>
			<TextAreaField
				label="Note"
				name="recipe.recipe.note"
				rows="5"
				register={register}
			/>

			<div className="flex gap-4 mt-10 justify-center">
				<Button
					className="primary login w-full"
					type="submit"
				>
					Add Recipe
				</Button>
				<Button
					className="cancle login w-full"
					type="reset"
					onClick={reset}
				>
					RESET
				</Button>
			</div>
		</form>
	);
}

const Title = ({ title }) => (
	<h2 className="border-b border-primary pb-1 mb-2">{title}</h2>
);
export default AddRecipeForm;
