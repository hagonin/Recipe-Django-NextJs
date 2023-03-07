import Link from 'next/link';
import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';
import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import { AiFillClockCircle } from 'react-icons/ai';
import {
	BsBookmarkFill,
	BsBookmarksFill,
	BsTrash,
	BsTrash2Fill,
} from 'react-icons/bs';
import { FiDelete, FiEdit } from 'react-icons/fi';
import { HiOutlineTag, HiPhotograph } from 'react-icons/hi';
import { MdDateRange, MdAddPhotoAlternate, MdDelete } from 'react-icons/md';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Rating from '@components/UI/Reviews/Rate';
import { FaTrash } from 'react-icons/fa';

function RecipeCard({
	name,
	image,
	date,
	id,
	summary,
	prep_time,
	cook_time,
	slug,
	rating,
	reviews_count,
	total_number_of_bookmarks,
	category,
	smallCard,
	lgCard,
	border,
	className,
	hasControl,
	handleDelete,
	goToUpdate,
	goToAddPhoto,
	secondary,
	actBookmark,
	handleToggleBookmark,
}) {
	const date_format = formatDate(date);
	const summaryMarkup = summary && createMarkup(summary);
	return (
		<div
			className={`h-full rounded overflow-hidden ${
				smallCard && 'shadow-md'
			} ${border ? 'pb-8 mt-8 border-b border-border' : ''} ${className}`}
		>
			<div className={`relative h-64 ${lgCard ? 'lg:col-span-5' : ''}`}>
				<Link
					href={
						secondary ? `/user/recipe/${slug}` : `/recipes/${slug}`
					}
				>
					<Img
						src={image}
						alt={`recipe ${name}`}
						className="h-64"
						cover
					/>
				</Link>

				{secondary ? null : (
					<Tippy
						content={
							<span>
								{actBookmark
									? 'Remove collection'
									: 'Add collection'}
							</span>
						}
					>
						<button
							onClick={() =>
								handleToggleBookmark(actBookmark, id)
							}
							className={`p-2 rounded-full  text-lg absolute top-2 right-2 shadow-lg ${
								actBookmark
									? 'bg-white text-primary'
									: 'bg-primary text-white'
							} `}
						>
							<BsBookmarksFill />
						</button>
					</Tippy>
				)}
			</div>
			<div
				className={`md:px-4 px-2 py-4 ${lgCard ? 'lg:col-span-7' : ''}`}
			>
				{category && (
					<span className="tag font-bold text-[0.8rem] mb-1 uppercase  !text-[#d85734] inline-flex px-2 rounded-md gap-2 items-center">
						<HiOutlineTag />
						{category}
					</span>
				)}

				<Link
					href={
						secondary ? `/user/recipe/${slug}` : `/recipes/${slug}`
					}
					className={`inline font-semibold ${
						smallCard ? 'text-lg' : lgCard ? 'text-2xl' : 'text-xl'
					} text-black line-clamp-2  hover:text-primary transition-all duration-200`}
				>
					{name}
				</Link>
				<div className="flex gap-x-3 gap-y-1 flex-row flex-wrap">
					{date_format && (
						<span
							className={`mt-2 ${
								lgCard ? 'text-base' : 'text-sm'
							} flex items-center gap-2`}
						>
							<MdDateRange className="text-primary" />
							{date_format}
						</span>
					)}
					{rating && (
						<Rating
							number={rating}
							small={smallCard}
						/>
					)}
				</div>

				<div className="flex gap-x-4 flex-wrap">
					{prep_time && (
						<div className="flex items-center gap-2 text-sm mt-5">
							<AiFillClockCircle />
							<span>Prep time:</span>
							<span>{prep_time}</span>
						</div>
					)}
					{cook_time && (
						<div className="flex items-center gap-2 text-sm mt-5">
							<AiFillClockCircle />
							<span>Cook time:</span>
							<span>{cook_time}</span>
						</div>
					)}
				</div>
				{summaryMarkup && (
					<>
						<div
							dangerouslySetInnerHTML={summaryMarkup}
							className="mt-3 line-clamp-6"
						/>
						<Button
							type="link"
							href={
								secondary
									? `/user/recipe/${slug}`
									: `/recipes/${slug}`
							}
							className="mt-6"
						>
							Continue Reading
						</Button>
					</>
				)}
				{hasControl && (
					<div className="flex gap-2 mt-3 justify-end text-lg">
						<Tippy content={<span>Edit</span>}>
							<button
								onClick={() => goToUpdate(slug)}
								className="hover:text-primary"
							>
								<FiEdit />
							</button>
						</Tippy>
						<Tippy content={<span>Add photo</span>}>
							<button
								onClick={() => goToAddPhoto(id, slug)}
								className="hover:text-primary"
							>
								<MdAddPhotoAlternate />
							</button>
						</Tippy>
						<Tippy content={<span>Delete</span>}>
							<button
								className="text-red"
								onClick={() => handleDelete(slug)}
							>
								<MdDelete />
							</button>
						</Tippy>
					</div>
				)}
			</div>
		</div>
	);
}

export default RecipeCard;
