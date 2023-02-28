import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import Link from 'next/link';
import { AiFillClockCircle } from 'react-icons/ai';
import { GrUpdate, GrView } from 'react-icons/gr';
import { MdDelete, MdPhoto } from 'react-icons/md';

function RecipeCard({
	name,
	image,
	date,
	id,
	summary,
	prep_time,
	cook_time,
	smallCard,
	lgCard,
	border,
	className,
	slug,
	hasControl,
	handleDelete,
	goToUpdate,
	goToAddPhoto,
}) {
	const date_format = formatDate(date);
	const summaryMarkup = summary && createMarkup(summary);
	return (
		<div
			className={`${
				border ? 'pb-8 mt-8 border-b border-border' : ''
			} ${className}`}
		>
			<Link
				href={slug ? `/user/recipe/${slug}` : `/recipes/${id}`}
				className={`${lgCard ? 'lg:col-span-5' : ''}`}
			>
				<Img
					src={image}
					alt={`recipe ${id}`}
					className="h-64"
					cover
				/>
			</Link>
			<div className={`${lgCard ? 'lg:col-span-7' : ''}`}>
				<Link
					href={slug ? `/user/recipe/${slug}` : `/recipes/${id}`}
					className={`inline ${
						smallCard
							? 'text-lg mt-4'
							: lgCard
							? 'text-2xl'
							: 'text-xl'
					} text-black line-clamp-2  hover:text-primary transition-all duration-300`}
				>
					{name}
				</Link>
				<span className="text-base inline-block mt-2">
					{date_format}
				</span>
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
							href={`/recipes/${id}`}
							className="mt-6"
						>
							Continue Reading
						</Button>
					</>
				)}
			</div>
			{hasControl && (
				<div className="flex gap-2 mt-3">
					<Button
						className="tag primary"
						onClick={() => goToUpdate(slug)}
					>
						Update
					</Button>
					<Button
						className="tag primary"
						onClick={() => goToAddPhoto(id, slug)}
					>
						Add Photo
					</Button>
					<Button
						className="tag !bg-red !text-white"
						onClick={() => handleDelete(slug)}
					>
						Delete
					</Button>
				</div>
			)}
		</div>
	);
}

export default RecipeCard;
