import { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiInformationCircle } from 'react-icons/hi';

import {
	InputField,
	SelectField,
	RichTextField,
	Label,
} from '@components/Form/FormControl';
import Button from '@components/UI/Button';
import Ingredients from './Ingredients';
import { categoryList, EXIST_RECIPE, images } from '@utils/constants';
import Image from './Image';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { FaRegLightbulb } from 'react-icons/fa';
import Loader from '@components/UI/Loader';
import Instructions from './Instructions';
import { useAuthContext } from '@context/auth-context';
import Note from './Note';
import { getFileFromUrl } from '@utils/getFileFromUrl';

function AddUpdateRecipeForm({ onSubmit, handleCancel, initValues, isUpdate }) {
	const { errors } = useAuthContext();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors: formErr, isSubmitting },
		reset,
		setValue,
		setError,
		unregister,
		watch,
	} = useForm({
		defaultValues: {
			recipe: {
				...initValues,
				description: initValues?.description || '',
				source: initValues?.source || '',
				notes: initValues?.notes || '',
				search_vector: initValues?.search_vector || '',
				main_image: initValues?.image_url || images.spoon,
				ingredient: initValues?.ingredients || {
					item: [{ recipe: EXIST_RECIPE }],
				},
				instructions: initValues?.instructions || [{ content: '' }],
			},
		},
	});

	useEffect(() => {
		reset();
	}, []);

	const createFormData = async ({ recipe }) => {
		const { ingredient, instructions: ins, main_image, ...rest } = recipe;

		const form = new FormData();
		// instructions
		const instructions = ins
			.filter(({ content }) => content)
			.map(
				({ content }, index) =>
					`<div><h4>Step ${index + 1}</h4><p>${content}</p></div>`
			)
			.join('');
		form.append('instructions', instructions);

		// add ingredients to form
		const ingredients = handleIngredients(ingredient);
		for (var i = 0; i < ingredients.length; i++) {
			Object.keys(ingredients[i]).forEach((key) => {
				form.append(`ingredients[${i}]${key}`, ingredients[i][key]);
			});
		}
		// add image to form
		let img;
		if (typeof main_image === 'string') {
			img = await getFileFromUrl(main_image, 'defaulrt');
		} else {
			img = main_image;
		}
		form.append('main_image', img, img.name);

		// // // add ...rest to form
		Object.keys(rest).forEach((key) => form.append(key, rest[key]));

		return onSubmit(form);
	};

	const handleIngredients = (ingredients) => {
		let arr1 = [];
		if (ingredients.group) {
			arr1 = ingredients.group.map((ingredient) => {
				return (
					ingredient.items &&
					ingredient.items.map((item) => ({
						...item,
						heading: ingredient.heading,
					}))
				);
			});
		}
		const arr2 =
			ingredients.item.map((item) => ({ ...item, heading: '' })) || [];
		return [...arr2, ...arr1.flat()];
	};

	const handleChooseImg = (file) => {
		setValue('recipe.main_image', file);
	};

	const handleUngister = (name) => {
		unregister(name);
	};

	const handleRegister = (name) => {
		register(name);
	};
	useEffect(() => {
		errors?.recipe?.title &&
			setError('recipe.title', {
				type: 'custom',
				message: errors?.recipe?.title,
			});
		errors?.recipe?.ingredients &&
			setError('recipe.ingredients', {
				type: 'custom',
				message: errors?.recipe?.ingredients,
			});
	}, [errors]);

	useEffect(() => {
		const key = watch('recipe.search_vector').replace(/[^\w\s]/gi, '');
		setValue('recipe.search_vector', key);
	}, [watch('recipe.search_vector')]);
	return (
		<form
			onSubmit={handleSubmit(createFormData)}
			noValidate={true}
		>
			<div className="flex flex-col gap-4">
				<Title title="Recipe Detail" />
				<div className="flex gap-6 max-md:flex-col">
					<div className="flex flex-col gap-6 flex-1">
						<InputField
							name="recipe.title"
							placeholder="E.g. Homemade Italian Dressing"
							type="text"
							register={register}
							error={formErr?.recipe?.title}
							label="Title"
							required
							rules={{ required: "What's your recipe called?" }}
						/>
						<SelectField
							name="recipe.category"
							register={register}
							error={formErr?.recipe?.category}
							options={categoryList}
							label="What kind of category ?"
							rules={{
								required: 'What kind of category is this?',
							}}
							required
							// error={formErr}
						/>
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
					</div>
					<div className="mt-4">
						<Label
							label="Photo"
							info={{
								content:
									'A beautiful picture of the result after cooking from this recipe.',
								placement: 'right',
							}}
						/>
						<Image
							handleChooseImg={handleChooseImg}
							urlInit={initValues?.image_url || images.spoon}
							// urlInit={images.spoon}
						/>
					</div>
				</div>
				<div className="flex gap-4 md:flex-row flex-col">
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
						rules={{ required: 'Enter people' }}
						placeholder="e.g. 8 people"
					/>
				</div>
				<div className="mt-4">
					<Title
						title="Instructions"
						info={{
							content:
								'Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.',
							placement: 'right',
						}}
					/>
					<Instructions
						register={register}
						control={control}
					/>
				</div>
			</div>
			<div className="mt-5">
				<Title
					title="Ingredients"
					info={{
						content: (
							<div>
								Enter your ingredients. Those ingredient can be
								a type of ingredient, or any special
								preparation. Besides, you can group your
								ingredient by use add heading. <br />
								For example:
								<ul className="list-disc px-3">
									<li>1 tablespoon chopped fresh parsley</li>{' '}
									<li>½ teaspoon lemon juice</li>
									<li>
										1 cup small pasta such as cavatelli,
										orzo, or ditalini
									</li>
								</ul>
							</div>
						),
						placement: 'right',
					}}
				/>

				<Ingredients
					control={control}
					register={register}
					error={formErr?.recipe?.ingredient}
				/>
			</div>
			<div className="flex gap-4 mt-8 mb-4">
				<div className="flex flex-col flex-1">
					<InputField
						name="recipe.search_vector"
						label="Keyword"
						type="text"
						register={register}
						error={formErr?.recipe?.search_vector}
						placeholder="e.g. salad dressings italian food"
						info={{
							content:
								'Keyword that can be used to search for this recipe. No characters.',
							placement: 'right',
						}}
						rules={{
							required:
								'What keyword is used to search this recipe?',
						}}
						required
					/>
				</div>
				<div className="flex-1">
					<InputField
						name="recipe.source"
						label="Source of recipe"
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
			</div>
			<Note
				register={register}
				handleUngister={handleUngister}
				initValue={initValues?.notes}
				handleRegister={handleRegister}
			/>
			{!isUpdate && (
				<p className="mx-auto mt-5">
					<FaRegLightbulb className="inline text-yellow relative -top-[2px]" />{' '}
					You can add more photos after you add the recipe. We all
					love photos recipes with good finished-product photos
					generally sort higher than those without.
				</p>
			)}
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
					{isSubmitting ? <Loader type="submitting" /> : null}
					{isUpdate ? 'Save Update' : 'Submit Recipe'}
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
export default memo(AddUpdateRecipeForm);
