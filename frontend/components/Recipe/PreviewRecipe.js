import { memo, useCallback, useEffect, useState } from 'react';

import { BsFillTagsFill, BsTrash } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { HiPhotograph, HiUserGroup } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import createMarkup from '@utils/createMarkup';

import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Tippy from '@tippyjs/react';
import formatDate from '@utils/formatdate';
import Ingredient from './SingleRecipe/Ingredient';
import ConfirmDelete from '@components/Form/ConfirmDelete';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import formatTime from '@utils/formatTime';
import { getInstructionAsArr } from '@utils/handleInstruction';

function PreviewRecipe({
	data,
	handleDeletePhoto,
	goToUpload,
	goToUpdate,
	gotoDelete,
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

	const [showConfirmDeletePhoto, setShowConfirmDeletePhoto] = useState(false);
	const [showConfirmDeleteRecipe, setShowConfirmDeleteRecipe] =
		useState(false);

	const [idPhotoDelete, setIdPhotoDelete] = useState(null);

	useEffect(() => {
		idPhotoDelete
			? setShowConfirmDeletePhoto(true)
			: setShowConfirmDeletePhoto(false);
	}, [idPhotoDelete]);

	const onDeletePhoto = useCallback(async () => {
		await handleDeletePhoto(idPhotoDelete);
		setIdPhotoDelete(null);
	});

	const onDeleteRecipe = useCallback(async () => {
		await gotoDelete(slug);
		toast.success('Delete success');
		router.push('/user/profile');
	});

	const arrInstructions = getInstructionAsArr(instructions);

	return (
		<>
			<ConfirmDelete
				showConfirm={showConfirmDeleteRecipe}
				handleCloseConfirm={() => setShowConfirmDeleteRecipe(false)}
				handleDelete={onDeleteRecipe}
			/>
			<div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-4 gap-6 mb-10">
				<div className="md:col-span-8">
					<h1 className="capitalize font-serif ">{title}</h1>
					<div className="flex flex-col mt-5">
						<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
							{created_at && (
								<div className="flex gap-2">
									<span className="text-xl">Create at:</span>
									<span className="text-xl text-medium text-black">
										{formatDate(created_at)}
									</span>
								</div>
							)}
							{updated_at && (
								<div className="flex gap-2">
									<span className="text-xl">Update at:</span>
									<span className="text-xl text-medium text-black">
										{formatDate(updated_at)}
									</span>
								</div>
							)}
							<span className="flex items-center gap-2 uppercase font-bold text-yellow">
								<BsFillTagsFill /> {category}
							</span>
						</div>
						<div className="flex items-center gap-2 mt-4">
							<span className="font-bold px-4 flex gap-2 items-center">
								<HiUserGroup className="relative -top-[1px]" />
								<div className="flex flex-col text-sm">
									<span className="font-bold">{serving}</span>
									<span className=" text-[#bbb]">SERVES</span>
								</div>
							</span>
							<span className="font-bold border-l-2  px-4 flex gap-2 items-center">
								<FaRegClock className="text-xl  relative -top-[1px]" />
								<div className="flex flex-col text-sm">
									<span className="font-bold">
										{formatTime(prep_time)}
									</span>
									<span className=" text-[#bbb]">PREP</span>
								</div>
							</span>
							<span className="font-bold border-l-2  px-4 flex gap-2 items-center">
								<FaRegClock className="text-xl relative -top-[1px]" />
								<div className="flex flex-col text-sm">
									<span className="font-bold">
										{formatTime(cook_time)}
									</span>
									<span className="text-[#bbb]">COOK</span>
								</div>
							</span>
						</div>
					</div>

					<div className="my-7">
						<Title label="Description" />
						<div
							className="text-justify text-lg pl-6 border-l-2 border-primary"
							dangerouslySetInnerHTML={createMarkup(description)}
						/>
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					<div className="my-7">
						<Title label="Instructions" />

						<ul className="list-decimal flex flex-col gap-2 ml-5 text-lg">
							{arrInstructions.map(({ content }, index) => (
								<li className="text-justify">{content}</li>
							))}
						</ul>
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					{!notes || notes === 'null' ? null : (
						<div className="mt-10 bg-third rounded-md px-5 py-3">
							<Title label="Notes" />
							<p className='relative -top-2'>{notes}</p>
						</div>
					)}
					{source && (
						<div className="mt-5">
							<span className="underline">Source</span>: {source}
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
						<Title label="Ingredients" />
						<Ingredient
							ingredients={ingredients}
							isPreview
						/>
					</div>
				</div>
			</div>

			<Title label="Photos" />
			<p className="relative -top-3">
				Add more photos to make your recipe fantasy
			</p>
			<Button
				className="w-56"
				icon={{ left: <HiPhotograph /> }}
				onClick={goToUpload}
			>
				Upload photo
			</Button>
			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-4 gap-2 my-5">
				{images?.map((img) => {
					return (
						<div
							className="relative"
							key={img.id}
						>
							<Img
								src={img.image}
								alt={img.caption}
								className="h-44 w-full"
								cover
							/>
							<button
								className="lg:text-xl text-2xl hover:text-red bg-white p-2 rounded-full absolute bottom-2 right-2"
								onClick={() => setIdPhotoDelete(img.id)}
							>
								<BsTrash />
							</button>
						</div>
					);
				})}
				<ConfirmDelete
					showConfirm={showConfirmDeletePhoto}
					handleCloseConfirm={() => setIdPhotoDelete(null)}
					handleDelete={onDeletePhoto}
				/>
			</div>

			{/* <button className="rounded-full underline text-lg hover:text-primary">
				Load More
			</button> */}
		</>
	);
}

const Title = ({ label }) => <h4 className="mb-4">{label}</h4>;

export default memo(PreviewRecipe);
