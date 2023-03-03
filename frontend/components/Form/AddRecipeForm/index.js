import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiInformationCircle } from 'react-icons/hi';

import {
	InputField,
	SelectField,
	TextAreaField,
	RichTextField,
	Label,
} from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import Ingredients from './Ingredients';
import {
	categories,
	EXIST_RECIPE,
	images,
	RECIPE_EXIST,
} from '@utils/constants';
import Image from './Image';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { FaRegLightbulb } from 'react-icons/fa';
import { getFileFromUrl } from '@utils/getFileFromUrl';
import Loader from '@components/UI/Loader';
import Instructions from './Instructions';

function AddRecipeForm({ onSubmit, handleCancel }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors: formErr, isSubmitting },
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			recipe: {
				ingredients: [{ recipe: EXIST_RECIPE }],
				main_image: null,
			},
		},
	});

	useEffect(() => {
		reset();
	}, []);

	const createFormData = async ({ recipe }) => {
		const { ingredients, instructions: ins, ...rest } = recipe;
		const form = new FormData();
		// instructions
		const instructions = ins
			.map(
				(content, index) =>
					`<div><h4>Step ${index + 1}:</h4><p>${content}</p></div>`
			)
			.join('');
		form.append('instructions', instructions);

		let { main_image } = recipe;
		// add ingredients to form
		for (var i = 0; i < ingredients.length; i++) {
			Object.keys(ingredients[i]).forEach((key) => {
				form.append(`ingredients[${i}]${key}`, ingredients[i][key]);
			});
		}
		// add image to form
		main_image = main_image
			? main_image
			: await getFileFromUrl(images.spoon, 'default');
		form.append('main_image', main_image, main_image.name);

		// add rest to form
		Object.keys(rest).forEach((key) => form.append(key, rest[key]));

		return onSubmit(form);
	};

	const handleChooseImg = (file) => {
		setValue('recipe.main_image', file);
	};

	return (
		<form
			onSubmit={handleSubmit(createFormData)}
			noValidate={true}
		>
			<div className="flex flex-col gap-4">
				<Title title="Recipe Detail" />
				<div className="flex gap-6">
					<div className="flex flex-col gap-6 flex-1">
						<InputField
							name="recipe.title"
							placeholder="E.g. Homemade Italian Dressing"
							type="text"
							register={register}
							error={formErr?.recipe?.title}
							label="Title"
						/>
						<SelectField
							name="recipe.category"
							register={register}
							error={formErr?.recipe?.category}
							options={categories}
							label="What kind of category ?"
						/>
					</div>
					<div>
						<Label
							label="Photo"
							info={{
								content:
									'A beautiful picture of the result after cooking from this recipe.',
								placement: 'right',
							}}
						/>
						<Image handleChooseImg={handleChooseImg} />
					</div>
				</div>
				<div className="flex gap-4">
					<InputField
						name="recipe.prep_time"
						label="Pre-time (minutes)"
						type="number"
						register={register}
						error={formErr?.recipe?.prep_time}
						placeholder="e.g. 30 minutes"
					/>
					<InputField
						name="recipe.cook_time"
						label="Cook-time (minutes)"
						type="number"
						register={register}
						error={formErr?.recipe?.cook_time}
						placeholder="e.g. 30 minutes"
					/>
					<InputField
						name="recipe.serving"
						label="Serve (people)"
						type="number"
						min="1"
						register={register}
						error={formErr?.recipe?.serving}
						placeholder="e.g. 8 people"
					/>
				</div>

				<Controller
					name="recipe.description"
					control={control}
					render={({ field }) => (
						<RichTextField
							field={field}
							label="Description"
							placeholder="Homemade salad dressing is pretty low hanging fruit if you’re looking to up your cooking game. It’s quick to make, budget-friendly, and tastier than store-bought. Homemade Italian dressing is a prime example. You shake it up in an ordinary jar using pantry staples. The whole operation will take you under 2 minutes and results in enough dressing to get you through a couple of family-sized salads.  "
							info={{
								content:
									'Share the story behind your recipe and makes it special.',
								placement: 'right',
							}}
						/>
					)}
				/>
				<Instructions
					register={register}
					control={control}
				/>
			</div>
			<div className="mt-5">
				<Title
					title="Ingredients"
					info={{
						content: (
							<div>
								Enter your ingredients. Those ingredient can be
								a type of ingredient, or any special
								preparation.
							</div>
						),
						placement: 'right',
					}}
				/>

				<Ingredients
					control={control}
					register={register}
				/>
			</div>
			<div className="flex gap-4 mt-8 mb-4">
				<InputField
					name="recipe.search_vector"
					label="Keyword (optional)"
					type="text"
					register={register}
					error={formErr?.recipe?.search_vector}
					placeholder="e.g. salad dressings"
					info={{
						content:
							'Keyword that can be used to search for this recipe',
						placement: 'right',
					}}
				/>

				<InputField
					name="recipe.source"
					label="Source of recipe (optional)"
					type="text"
					register={register}
					error={formErr?.recipe?.source}
					placeholder="e.g. recipe.example.com"
					info={{
						content: 'Where did this recipe come from ?',
						placement: 'right',
					}}
				/>
			</div>
			<TextAreaField
				label="Note (optional)"
				name="recipe.notes"
				rows="5"
				register={register}
			/>
			<p className="mx-auto mt-5">
				<FaRegLightbulb className="inline text-yellow-500 relative -top-[2px]" />{' '}
				You can add more photos after you add the recipe. We all love
				photos recipes with good finished-product photos generally sort
				higher than those without.
			</p>
			<div className="flex gap-4 mt-5 justify-end items-center">
				<Button
					className="cancle"
					type="reset"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button
					className="login primary px-24"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader type="submitting" />}
					Submit Recipe
				</Button>
			</div>
		</form>
	);
}

const Title = ({ title, info }) => (
	<div className="flex gap-2 items-center border-b border-primary pb-1 mb-2">
		<h2>{title}</h2>
		{info && (
			<Tippy
				content={info.content}
				placement={info.placement || 'top'}
			>
				<button className="relative -top-1 text-primaryDark">
					<HiInformationCircle />
				</button>
			</Tippy>
		)}
	</div>
);
export default AddRecipeForm;
