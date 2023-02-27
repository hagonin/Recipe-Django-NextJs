import Img from '@components/UI/Image';
import formatDate from '@utils/formatdate';
import { BsFillTagsFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { MdCategory } from 'react-icons/md';

function PreviewRecipe({
	title,
	prep_time,
	cook_time,
	serving,
	author,
	description,
	instructions,
	created_at,
	updated_at,
	image,
	category,
	ingredients,
	notes,
	keyword,
	source,
}) {
	return (
		<div className="grid md:grid-cols-12 grid-cols-1 lg:gap-6 md:gap-4 gap-6 container py-14">
			<div className="col-span-8">
				<div className="flex gap-2">
					<h1 className="font-bold">{title}</h1>
					<span className="flex items-center gap-2">
						<BsFillTagsFill className="text-primary" /> {category}
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
								<span>{formatDate(created_at)}</span>
							</div>
						)}
						{updated_at && (
							<div className="flex gap-2">
								<h3>Updated at:</h3>
								<span>{formatDate(updated_at)}</span>
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
					<p>{description}</p>
				</div>
				<span className="border-b w-4/5 mx-auto block"></span>
				<div className="my-10">
					<h3>Instruction:</h3>
					<p>{instructions}</p>
				</div>
				<span className="border-b w-4/5 mx-auto block"></span>
				{notes && (
					<div className="mt-10 bg-third rounded-md px-5 py-3">
						<h3 className="underline decoration-dotted">Notes:</h3>
						<p>{notes}</p>
					</div>
				)}
				{keyword && (
					<span className="mt-6 block">
						<span className="underline ">Keyword</span>: {keyword}
					</span>
				)}
				{source && (
					<div>
						<span className="underline">Source</span>: {source}
					</div>
				)}
			</div>
			<div className="col-span-4 border-l bg-[#F9F9F9] p-5">
				<Img
					alt="recipe"
					src={image}
					className="h-64"
				/>
				<div>
					<h3 className="mt-10">Ingredients:</h3>
					<ul className="list-disc ml-8">
						{ingredients.map((ingredient) => (
							<li>{`${ingredient?.quantity} ${ingredient?.unit} ${ingredient?.title}  ${ingredient?.desc}`}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default PreviewRecipe;
