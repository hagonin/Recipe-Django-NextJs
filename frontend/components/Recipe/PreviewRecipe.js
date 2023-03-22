import { memo, useState } from 'react';
import { useRouter } from 'next/router';

import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import { getInstructionAsArr } from '@utils/handleInstruction';

import Img from '@components/UI/Image';
import Ingredient from './SingleRecipe/Ingredient';
import ConfirmDelete from '@components/Form/ConfirmDelete';
import Title from '@components/UI/Title';
import DropDown, { Child } from '@components/UI/Dropdown';
import { TimerBox } from './SingleRecipe';
import Method from './SingleRecipe/Method';
import Button from '@components/UI/Button';
import Notes from './SingleRecipe/Notes';
import Source from './SingleRecipe/Source';
import Category from './SingleRecipe/Category';

function PreviewRecipe({
	data,
	goToUpdate,
	gotoDelete,
	goToRecipeSingle,
	goToUploadPhoto,
}) {
	const router = useRouter();
	const {
		title,
		prep_time,
		cook_time,
		serving,
		description,
		instructions,
		created_at,
		updated_at,
		main_image,
		images,
		category,
		ingredients,
		notes,
		source,
		slug,
	} = data;

	const [showConfirmDeleteRecipe, setShowConfirmDeleteRecipe] =
		useState(false);

	const arrInstructions = getInstructionAsArr(instructions);

	return (
		<>
			<ConfirmDelete
				showConfirm={showConfirmDeleteRecipe}
				handleCloseConfirm={() => setShowConfirmDeleteRecipe(false)}
				handleDelete={gotoDelete}
			/>
			<div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-4 gap-6 mb-4">
				<div className="md:col-span-8">
					<div className="flex gap-2">
						<h1 className="capitalize font-serif ">{title}</h1>
						<Category category={category} />
					</div>
					<div className="flex flex-col mt-3">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
							{created_at && (
								<div className="flex gap-2">
									<span className="text-base flex">
										Created at:
									</span>
									<span className="text-base text-semibold text-black relative top-[1px]">
										{formatDate(created_at)}
									</span>
								</div>
							)}
							{updated_at && (
								<div className="flex gap-2">
									<span className="text-base">
										Updated at:
									</span>
									<span className="text-base text-semibold text-black relative top-[1px]">
										{formatDate(updated_at)}
									</span>
								</div>
							)}
						</div>
						<div className="flex flex-wrap items-center gap-5 mt-1">
							<TimerBox
								prep_time={prep_time}
								cook_time={cook_time}
								serving={serving}
							/>
						</div>
					</div>

					<div className="my-6">
						<Title
							title="Description"
							bottom="mb-3"
						/>
						{description ? (
							<div
								dangerouslySetInnerHTML={createMarkup(
									description
								)}
							/>
						) : (
							<span className="opacity-60 italic">
								You have not added description.
							</span>
						)}
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					<div className="my-6">
						<Method instructionsArr={arrInstructions} />
					</div>
					<span className="border-b w-4/5 mx-auto block mb-3"></span>
					<Notes notes={notes} />
					<Source source={source} />
				</div>
				<div className="md:col-span-4 ">
					<Img
						alt="recipe"
						src={main_image}
						className="h-64 w-full"
						cover
					/>
					<div className="px-5 py-6 bg-[#F9F9F9]  border">
						<Ingredient
							ingredients={ingredients}
							isPreview
						/>
					</div>
				</div>
			</div>

			<Title title="Photos" />
			<p className="relative -top-3">
				Add more photos to make your recipe fantasy
			</p>
			{images.length > 0 ? (
				<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-2 mb-4">
					{images.map((img, index) => {
						return (
							<div
								className="relative"
								key={index}
							>
								<Img
									src={img.image}
									alt={img.caption}
									className="h-44 w-full"
									cover
								/>
							</div>
						);
					})}
				</div>
			) : null}

			<DropDown label="Select an action">
				<Child>
					<Button onClick={goToRecipeSingle}>
						Go to this publish recipe
					</Button>
				</Child>
				<Child>
					<Button onClick={goToUpdate}>Update Recipe</Button>
				</Child>
				<Child>
					<Button onClick={goToUploadPhoto}>Manage Photos</Button>
				</Child>
				<Child>
					<Button onClick={() => setShowConfirmDeleteRecipe(true)}>
						Delete Recipe
					</Button>
				</Child>
			</DropDown>
		</>
	);
}

export default memo(PreviewRecipe);
