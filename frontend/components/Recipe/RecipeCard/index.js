import { useState } from 'react';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import formatDate from '@utils/formatdate';
import { MdAddPhotoAlternate, MdDateRange, MdDelete } from 'react-icons/md';

import Tooltip from '@components/UI/Tooltip';
import getPlainTextFromHtml from '@utils/getPlainTextFromHtml';
import Category from '../SingleRecipe/Category';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Rating from '@components/Reviews/Rate';
import ConfirmDelete from '@components/Form/ConfirmDelete';

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
	lastestRecipe,
	firstPost,
	secondPost,
	isSlider,
}) {
	const date_format = formatDate(date);
	const summaryMarkup = summary && getPlainTextFromHtml(summary);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	return lastestRecipe ? (
		<div
			className={` flex md:gap-4 gap-2 border-t   
			${firstPost ? 'border-t-transparent' : ''} 
			${secondPost ? 'md:border-t-transparent' : ''}
			${firstPost || secondPost ? '' : 'md:pt-4 pt-2'}
			`}
		>
			<Link
				href={`/recipes/${slug}`}
				className="md:h-24 md:w-20 lg:w-24 lg:h-24 w-24 h-24"
			>
				<Img
					src={main_image}
					alt={name}
					className="w-full h-full"
					cover
				/>
			</Link>
			<div className="flex-1 flex flex-col justify-center">
				<Link
					href={`/recipes/${slug}`}
					className="text-semibold leading-6 text-xl font-serif text-black line-clamp-2 capitalize hover:text-primary"
				>
					{name}
				</Link>
				<span className="text-sm block whitespace-nowrap leading-none mt-2">
					{date_format}
				</span>
				{rating && (
					<Rating
						number={rating}
						count={reviews_count}
						small
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
				className={`h-full  rounded overflow-hidden   ${
					smallCard && 'md:shadow md:hover:shadow-lg border'
				} ${
					border ? 'pb-8 mt-8 border-b border-border' : ''
				} ${className} ${
					isSlider ? 'mb-5 ' : 'transition-all duration-300'
				}`}
			>
				<div
					className={`relative  ${
						lgCard ? 'lg:col-span-5 h-full w-full' : 'md:h-56 h-48'
					}`}
				>
					<Link
						href={`${
							secondary
								? `/user/recipe/${slug}`
								: `/recipes/${slug}`
						}`}
						className={`${lgCard ? ' w-full' : ''}`}
					>
						<Img
							src={main_image}
							alt={name}
							className={`${
								lgCard
									? 'lg:h-full w-full h-56'
									: 'md:h-56 h-48'
							}`}
							cover
							title={name}
						/>
					</Link>

					{secondary ? null : (
						<Tooltip
							content={
								actBookmark ? 'Remove wishlist' : 'Add wishlist'
							}
						>
							<button
								onClick={() =>
									handleToggleBookmark(actBookmark, id)
								}
								className={`p-2 bg-whiteTransparent rounded-full  text-xl absolute top-2 right-2 shadow-lg ${
									actBookmark ? ' text-red' : ' text-primary'
								} `}
							>
								<AiFillHeart />
							</button>
						</Tooltip>
					)}
				</div>
				<div
					className={` pt-3  pb-4  ${
						lgCard ? 'lg:col-span-7' : 'md:px-4 px-2'
					}`}
				>
					<div>
						<Category category={category} />
						<Link
							href={
								secondary
									? `/user/recipe/${slug}`
									: `/recipes/${slug}`
							}
							className={`inline text-black  font-serif capitalize ${
								smallCard
									? 'text-2xl'
									: lgCard
									? 'text-2xl '
									: 'text-xl'
							}    hover:text-primaryDark transition-all duration-200 ${
								isSlider ? ' line-clamp-1' : ' line-clamp-2'
							}`}
							title={name}
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
									lgCard ? 'text-base mr-3' : 'text-sm'
								} flex items-center gap-1`}
							>
								{lgCard && <MdDateRange />}
								{date_format}
							</span>
						)}
						{rating ? (
							<Link href={`/recipes/${slug}`}>
								<Rating
									number={rating}
									small={smallCard || lgCard}
									count={reviews_count}
								/>
							</Link>
						) : null}
					</div>

					{summaryMarkup && lgCard && (
						<>
							<p className="mt-2 text-base line-clamp-4">
								{summaryMarkup}
							</p>

							<Button
								type="link"
								href={
									secondary
										? `/user/recipe/${slug}`
										: `/recipes/${slug}`
								}
								className="md:mt-4 mt-2  !h-9 !text-[0.7rem] tracking-[0.2em]"
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
