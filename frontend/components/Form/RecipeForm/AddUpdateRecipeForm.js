import { memo, useEffect, useRef, useState } from 'react';
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
import { categoryList, EXIST_RECIPE } from '@utils/constants';
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
import { info_recipeform } from './info';
import { keyword } from '../FormControl/validate';
import { getInstructionAsDrawHtml } from '@utils/handleInstruction';

function AddUpdateRecipeForm({ onSubmit, handleCancel, initValues, isUpdate }) {
	const { errors } = useAuthContext();
	const exist_recipe = useRef(EXIST_RECIPE);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors: formErr, isSubmitting },
		reset,
		setValue,
		setError,
		unregister,
	} = useForm({
		defaultValues: {
			recipe: {
				...initValues,
				description: initValues?.description || '',
				source: initValues?.source || '',
				notes: initValues?.notes || '',
				search_vector: initValues?.search_vector || '',
				main_image: initValues?.image_url || null,
				ingredient: (initValues && {
					item: initValues.ingredients.item,
					group: initValues.ingredients.group,
				}) || {
					item: [{ recipe: exist_recipe.current }],
				},
				instructions: initValues?.instructions || [{ content: '' }],
			},
		},
		mode: 'onChange',
	});

	useEffect(() => {
		reset();
	}, []);

	const createFormData = async ({ recipe }) => {
		const { ingredient, instructions: ins, main_image, ...rest } = recipe;

		const form = new FormData();
		// instructions
		const instructions = getInstructionAsDrawHtml(ins);
		form.append('instructions', instructions);

		// add ingredients to form
		const ingredients = handleIngredientsToArr(ingredient);
		for (var i = 0; i < ingredients.length; i++) {
			Object.keys(ingredients[i]).forEach((key) => {
				form.append(`ingredients[${i}]${key}`, ingredients[i][key]);
			});
		}
		// check img before add to form
		let img;
		if (typeof main_image === 'string') {
			img = await getFileFromUrl(main_image, 'defaulrt');
		}
		img && form.append('main_image', img, img.name);

		// // // add ...rest to form
		Object.keys(rest).forEach((key) => form.append(key, rest[key]));

		return onSubmit({ form });
	};

	const handleIngredientsToArr = (ingredients) => {
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
		if (initValues?.ingredients) {
			exist_recipe.current = initValues.ingredients.exist_recipe;
		}
	}, [initValues]);

	return (
		<form
			onSubmit={handleSubmit(createFormData)}
			noValidate={true}
		>
			<div className="flex flex-col">
				<Title title="Recipe Detail" />
				<div className="flex gap-6 max-md:flex-col">
					<div className="flex flex-col gap-4 flex-1">
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

						<Controller
							name="recipe.description"
							control={control}
							render={({ field }) => (
								<RichTextField
									field={field}
									label="Description"
									placeholder={
										info_recipeform.desc.placeholder
									}
									info={{
										content: info_recipeform.desc.info,
									}}
								/>
							)}
						/>
					</div>
					<div className="mt-4">
						<Label
							label="Photo"
							info={{
								content: info_recipeform.photo.info,
							}}
						/>
						<Image
							handleChooseImg={handleChooseImg}
							urlInit={initValues?.image_url}
						/>
					</div>
				</div>
				<div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-4">
					<SelectField
						name="recipe.category"
						register={register}
						error={formErr?.recipe?.category}
						options={categoryList}
						label="Category"
						rules={{
							required: 'What kind of category is this?',
						}}
						required
					/>
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
						type="text"
						register={register}
						error={formErr?.recipe?.serving}
						rules={{ required: 'Please enter people' }}
						placeholder="e.g. 1, 2, 1-3, 4-5"
						required
						info={{
							content: info_recipeform.serving.info,
						}}
					/>
				</div>
				<div className="mt-4">
					<Title
						title="Instructions"
						info={{
							content: info_recipeform.instructions.info,
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
						content: info_recipeform.ingredients.info,
					}}
				/>

				<Ingredients
					control={control}
					register={register}
					error={formErr?.recipe?.ingredient}
					exist_recipe={exist_recipe.current}
				/>
			</div>
			<div className="flex gap-4 mt-4 mb-4">
				<div className="flex flex-col flex-1">
					<InputField
						name="recipe.search_vector"
						label="Keyword"
						type="text"
						register={register}
						error={formErr?.recipe?.search_vector}
						placeholder="e.g. salad dressings italian food"
						info={{
							content: info_recipeform.search_vector.info,
						}}
						rules={keyword}
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
					className="lg primary px-24"
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
		<h2 className="font-serif">{title}</h2>
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
