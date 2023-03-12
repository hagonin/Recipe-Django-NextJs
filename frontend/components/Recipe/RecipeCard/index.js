import Link from 'next/link';
import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import { AiFillClockCircle } from 'react-icons/ai';
import { BsBookmarksFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineTag } from 'react-icons/hi';
import { MdDateRange, MdAddPhotoAlternate, MdDelete } from 'react-icons/md';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Rating from '@components/UI/Reviews/Rate';
import ConfirmDelete from '@components/Form/ConfirmDelete';
import { useState } from 'react';
import Tooltip from '@components/UI/Tooltip';

function RecipeCard({
	name,
	main_image,
	date,
	id,
	summary,
	slug,
	rating,
	reviews_count,
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
	handleToggleBookmark = () => {},
	lastPost,
	isAverage,
}) {
	const date_format = formatDate(date);
	const summaryMarkup = summary && createMarkup(summary);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	return lastPost ? (
		<div className={`flex grid-cols-3 md:gap-4 gap-2 border-b pb-4`}>
			<Link
				href={`/recips/${slug}`}
				className="md:h-24 md:w-20 lg:w-24 lg:h-24 w-24 h-24"
			>
				<Img
					src={main_image}
					alt={name}
					className="w-full h-full"
					cover
				/>
			</Link>
			<div className="flex-1">
				<Link
					href={`/recips/${slug}`}
					className="text-semibold lg:text-xl text-lg font-serif text-black line-clamp-2 capitalize"
				>
					{name}
				</Link>
				<span className="text-sm block">{date_format}</span>
				{rating && (
					<Rating
						number={rating}
						count={reviews_count}
						small
						isAverage={isAverage}
					/>
				)}
			</div>
		</div>
	) : (
		<>
			<ConfirmDelete
				showConfirm={showConfirmDelete}
				handleDelete={() => handleDelete(slug)}
				handleCloseConfirm={() => setShowConfirmDelete(false)}
			/>
			<div
				className={`h-full  rounded overflow-hidden ${
					smallCard && 'shadow-md'
				} ${
					border ? 'pb-8 mt-8 border-b border-border' : ''
				} ${className}`}
			>
				<div
					className={`relative md:h-64 h-48 ${
						lgCard ? 'lg:col-span-5' : ''
					}`}
				>
					<Link
						href={
							secondary
								? `/user/recipe/${slug}`
								: `/recipes/${slug}`
						}
					>
						<Img
							src={main_image}
							alt={name}
							className="md:h-64 h-48 "
							cover
						/>
					</Link>

					{secondary ? null : (
						<Tooltip
							content={
								actBookmark
									? 'Remove collection'
									: 'Add collection'
							}
						>
							<button
								onClick={() =>
									handleToggleBookmark(actBookmark, id)
								}
								className={`p-2 rounded-full  text-xl absolute top-2 right-2 shadow-lg ${
									actBookmark
										? 'bg-white text-primary'
										: 'bg-primary text-white'
								} `}
							>
								<BsBookmarksFill />
							</button>
						</Tooltip>
					)}
				</div>
				<div
					className={`md:px-4 px-2 pt-3  pb-4  ${
						lgCard ? 'lg:col-span-7' : ''
					}`}
				>
					<div>
						{category && (
							<span className="tag font-bold text-[0.8rem] mb-1 mt-3 uppercase  !text-red2 inline-flex px-2 rounded-md gap-2 items-center">
								<HiOutlineTag />
								{category}
							</span>
						)}
						<Link
							href={
								secondary
									? `/user/recipe/${slug}`
									: `/recipes/${slug}`
							}
							className={`inline text-black  font-serif capitalize line-clamp-2 ${
								smallCard
									? 'text-2xl'
									: lgCard
									? 'text-2xl '
									: 'text-xl'
							}    hover:text-primaryDark transition-all duration-200`}
						>
							{name}
						</Link>
					</div>

					<div
						className={` ${
							lgCard ? '' : 'justify-between'
						} flex flex-row flex-wrap  ${
							secondary || lgCard ? '' : 'border-t mt-3'
						}`}
					>
						{date_format && (
							<span
								className={`mt-1 ${
									lgCard ? 'text-base' : 'text-sm'
								} flex items-center gap-1`}
							>
								<MdDateRange className="text-primary" />
								{date_format}
							</span>
						)}
						{rating ? (
							<Rating
								number={rating}
								small={smallCard}
								count={reviews_count}
							/>
						) : null}
					</div>

					{summaryMarkup && (
						<>
							<div
								dangerouslySetInnerHTML={summaryMarkup}
								className="mt-1 line-clamp-4 text-lg"
							/>
							<Button
								type="link"
								href={
									secondary
										? `/user/recipe/${slug}`
										: `/recipes/${slug}`
								}
								className="mt-4"
							>
								Continue Reading
							</Button>
						</>
					)}

					{hasControl && (
						<div className="flex gap-2 mt-3 justify-end text-lg">
							<Tooltip content="Edit">
								<button
									onClick={() => goToUpdate(slug)}
									className="hover:text-primary"
								>
									<FiEdit />
								</button>
							</Tooltip>
							<Tooltip content="Add photo">
								<button
									onClick={() => goToAddPhoto(id, slug)}
									className="hover:text-primary"
								>
									<MdAddPhotoAlternate />
								</button>
							</Tooltip>
							<Tooltip content="Delete">
								<button
									className="text-red"
									onClick={() => setShowConfirmDelete(true)}
								>
									<MdDelete />
								</button>
							</Tooltip>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default RecipeCard;
