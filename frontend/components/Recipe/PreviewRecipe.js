import { memo, useState } from 'react';

import { BsFillTagsFill } from 'react-icons/bs';
import createMarkup from '@utils/createMarkup';

import Img from '@components/UI/Image';
import formatDate from '@utils/formatdate';
import Ingredient from './SingleRecipe/Ingredient';
import ConfirmDelete from '@components/Form/ConfirmDelete';
import { useRouter } from 'next/router';
import { getInstructionAsArr } from '@utils/handleInstruction';

import Title from '@components/UI/Title';
import DropDown, { Child } from '@components/UI/Dropdown';
import { TimerBox } from './SingleRecipe';
import Method from './SingleRecipe/Method';
import { MdPhoto, MdUpdate } from 'react-icons/md';

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
			<div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-4 gap-6 mb-10">
				<div className="md:col-span-8">
					<div className="flex gap-2">
						<h1 className="capitalize font-serif ">{title}</h1>
						<span className="flex items-center gap-2 text-sm uppercase font-bold text-yellow">
							<BsFillTagsFill /> {category}
						</span>
					</div>
					<div className="flex flex-col mt-5">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
							{created_at && (
								<div className="flex gap-2">
									<span className="text-lg flex">
										Create at:
									</span>
									<span className="text-base text-semibold text-black relative top-[1px]">
										{formatDate(created_at)}
									</span>
								</div>
							)}
							{updated_at && (
								<div className="flex gap-2">
									<span className="text-lg">Update at:</span>
									<span className="text-base text-semibold text-black relative top-[1px]">
										{formatDate(updated_at)}
									</span>
								</div>
							)}
						</div>
						<div className="flex flex-wrap items-center gap-5 mt-4">
							<TimerBox
								prep_time={prep_time}
								cook_time={cook_time}
								serving={serving}
							/>
						</div>
					</div>

					<div className="my-7">
						<Title title="Description" />
						{description ? (
							<div
								className="text-justify text-lg pl-6 border-l-2 border-primary capitalize"
								dangerouslySetInnerHTML={createMarkup(
									description
								)}
							/>
						) : (
							<span className="opacity-60 italic">
								You have not added instructions
							</span>
						)}
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					<div className="my-7">
						<Method instructionsArr={arrInstructions} />
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					{notes ? (
						<div className="mt-10 bg-third rounded-md px-5 py-3">
							<Title title="Notes" />
							<p className="relative -top-2 first-letter:capitalize">
								{notes}
							</p>
						</div>
					) : (
						<span className="opacity-60 italic">
							No notes displayed
						</span>
					)}
					{source && (
						<div className="mt-5">
							<Title title="source" />
							<span>{source}</span>
						</div>
					)}
				</div>
				<div className="md:col-span-4 ">
					<Img
						alt="recipe"
						src={main_image}
						className="h-64 w-full"
						cover
					/>
					<div className="px-5 py-6 bg-[#F9F9F9]  border">
						<Title title="Ingredients" />
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
			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-2 my-4">
				{images?.map((img, index) => {
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

			<div className="flex md:gap-4 gap-2 md:flex-row flex-col mt-8">
				<DropDown>
					<Child>
						<button
							className="px-3 hover:bg-grey rounded-md border hover:text-primary whitespace-nowrap h-9"
							onClick={goToRecipeSingle}
						>
							Go to this publish recipe
						</button>
					</Child>
					<Child>
						<button
							className="px-3 hover:bg-grey rounded-md border hover:text-primary whitespace-nowrap h-9 flex items-center gap-2"
							onClick={goToUpdate}
						>
							<MdUpdate /> Update Recipe
						</button>
					</Child>
					<Child>
						<button
							className="px-3 hover:bg-grey rounded-md border hover:text-primary whitespace-nowrap h-9 flex items-center gap-2"
							onClick={goToUploadPhoto}
						>
							<MdPhoto /> Manage Photos
						</button>
					</Child>
					<Child>
						<button
							className="px-3 hover:bg-grey rounded-md border hover:text-primary whitespace-nowrap h-9"
							onClick={() => setShowConfirmDeleteRecipe(true)}
						>
							Delete Recipe
						</button>
					</Child>
				</DropDown>
			</div>
		</>
	);
}

export default memo(PreviewRecipe);
