import { memo } from 'react';

import { BsFillTagsFill, BsTrash } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { HiPhotograph, HiUserGroup } from 'react-icons/hi';
import { MdDelete, MdDeleteForever, MdEdit } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import createMarkup from '@utils/createMarkup';
import { GrAdd } from 'react-icons/gr';

import Button from '@components/UI/Button';
import Img from '@components/UI/Image';

function PreviewRecipe({
	data,
	handleDeletePhoto,
	editIngredient,
	addNewIngredient,
	deleteIngredient,
	goToUpload,
	goToEdit,
}) {
	const {
		id,
		title,
		prep_time,
		cook_time,
		serving,
		user: author,
		description,
		instructions,
		created_at,
		updated_at,
		image_url: image,
		images,
		category,
		ingredients,
		notes,
		source,
		slug,
	} = data;
	

	return (
		<>
			<div className="grid md:grid-cols-12 grid-cols-1 lg:gap-6 md:gap-4 gap-6 container py-14">
				<div className="md:col-span-8">
					<div className="flex gap-2 justify-end">
						<Button
							icon={{ left: <FiEdit /> }}
							className="primary"
							onClick={goToEdit}
						>
							Edit
						</Button>
						<Button
							icon={{ left: <MdDeleteForever /> }}
							className="verify"
						>
							Delete
						</Button>
					</div>
					<div className="flex gap-2 mt-5">
						<h1 className="font-bold">{title}</h1>
						<span className="flex items-center gap-2">
							<BsFillTagsFill className="text-primary" />{' '}
							{category}
						</span>
					</div>
					<div className="flex flex-col mt-5">
						<div className="flex items-center gap-6">
							<div className="flex gap-2">
								<h3>Author:</h3>
								<span>{author}</span>
							</div>
							{created_at && (
								<div className="flex gap-2">
									<h3>Create at:</h3>
									<span>{created_at}</span>
								</div>
							)}
							{updated_at && (
								<div className="flex gap-2">
									<h3>Updated at:</h3>
									<span>{updated_at}</span>
								</div>
							)}
						</div>
						<div className="flex items-center gap-2 mt-4">
							<span className="font-bold px-4 flex gap-2 items-center">
								<HiUserGroup className="relative -top-[1px]" />
								<span className="">{serving}</span>
							</span>
							<span className="font-bold border-l-2  px-4 flex gap-2 items-center">
								<FaRegClock className="relative -top-[1px]" />
								<div className="flex flex-col text-sm">
									<span className="font-bold">
										{prep_time}MIN
									</span>
									<span className=" text-[#ccc]">PREP</span>
								</div>
							</span>
							<span className="font-bold border-l-2  px-4 flex gap-2 items-center">
								<FaRegClock className="relative -top-[1px]" />
								<div className="flex flex-col text-sm">
									<span className="font-bold">
										{cook_time}MIN
									</span>
									<span className=" text-[#ccc]">COOK</span>
								</div>
							</span>
						</div>
					</div>

					<div className="my-10">
						<h3>Description:</h3>
						<div
							dangerouslySetInnerHTML={createMarkup(description)}
						/>
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					<div className="my-10">
						<h3>Instruction:</h3>
						<div
							dangerouslySetInnerHTML={createMarkup(instructions)}
						/>
					</div>
					<span className="border-b w-4/5 mx-auto block"></span>
					{notes && (
						<div className="mt-10 bg-third rounded-md px-5 py-3">
							<h3 className="underline decoration-dotted">
								Notes:
							</h3>
							<p>{notes}</p>
						</div>
					)}
					{source && (
						<div>
							<span className="underline">Source</span>: {source}
						</div>
					)}
				</div>
				<div className="md:col-span-4 border-l bg-[#F9F9F9] p-5">
					<Img
						alt="recipe"
						src={image}
						className="h-64"
					/>
					<div>
						<div className="flex gap-2 items-center mt-10 ">
							<h3>Ingredients:</h3>

							<button onClick={addNewIngredient}>
								<GrAdd />
							</button>
						</div>
						<ul className="list-disc ml-8">
							{ingredients.map((ingredient) => (
								<li
									key={ingredient.id}
									className="flex justify-between group gap-2"
								>
									<span>{`${ingredient?.quantity} ${ingredient?.unit} ${ingredient?.title}  ${ingredient?.desc}`}</span>
									<button
										className="ml-auto visible"
										onClick={() =>
											editIngredient(ingredient.id)
										}
									>
										<MdEdit />
									</button>
									<button
										className="visible"
										onClick={() =>
											deleteIngredient(ingredient.id)
										}
									>
										<MdDelete />
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<h2>Photos</h2>
			<Button
				className="w-56 mt-5"
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
								src={img.image_url}
								alt={img.caption}
							/>
							<button
								className="lg:text-xl text-2xl hover:text-red bg-white p-2 rounded-full absolute bottom-2 right-2"
								onClick={() => handleDeletePhoto(img.id)}
							>
								<BsTrash />
							</button>
						</div>
					);
				})}
			</div>
			<button className="rounded-full underline text-lg hover:text-primary">
				Load More
			</button>
		</>
	);
}

export default memo(PreviewRecipe);
