import { BsClockFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Img from '@components/UI/Image';
import formatDate from '@utils/formatdate';
import createMarkup from '@utils/createMarkup';
import Thumbnail from '@components/UI/Slider/Thumbnail';
import Ingredient from './Ingredient';
import Rating from '@components/Reviews/Rate';
import formatTime from '@utils/formatTime';
import { getInstructionAsArr } from '@utils/handleInstruction';
import { AiFillHeart } from 'react-icons/ai';
import Button from '@components/UI/Button';
import Method from './Method';
import Notes from './Notes';
import Source from './Source';

function SingRecipe({
	id,
	updated_at,
	cover,
	prep_time,
	cook_time,
	instructions,
	serving,
	title,
	description,
	notes,
	rating,
	reviews_count,
	user: author,
	ingredients,
	images = [],
	checkBookmarkAct,
	handleToggleBookmark,
	source,
}) {
	const actBookmark = checkBookmarkAct(id);
	const updated_at_format = formatDate(updated_at);
	const descriptionMarkup = createMarkup(description);

	const instructionsArr = getInstructionAsArr(instructions);
	return (
		<div>
			<h1 className="text-center font-serif capitalize">{title}</h1>
			<span className="block text-center font-medium mt-2">
				{`${updated_at_format} / by ${author}`}
			</span>
			<Img
				src={cover}
				alt="cover"
				className="mt-4 w-full h-[600px] mx-auto "
				cover
			/>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 border-y border-border mt-8 py-3 text-sm gap-4 mb-5">
				<TimerBox
					prep_time={prep_time}
					cook_time={cook_time}
					serving={serving}
				/>
			</div>
			<div dangerouslySetInnerHTML={descriptionMarkup} />
			{images.length > 0 && <Thumbnail images={images} />}

			<div className="border border-border rounded-md lg:p-6 p-4 mt-8">
				<div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 md:gap-4 gap-6">
					<div className="lg:col-span-8 ">
						<h2 className="font-serif capitalize">{title}</h2>
						<span className="block mt-1">
							{`${updated_at_format} / by ${author}`}
						</span>
						{rating && (
							<Rating
								number={rating}
								count={reviews_count}
								isAverage
							/>
						)}

						<div className="flex flex-wrap gap-x-6 my-3 ">
							<TimerBox
								prep_time={prep_time}
								cook_time={cook_time}
								serving={serving}
							/>
						</div>
						<button
							className="flex gap-2 items-center text-base h-6 bg-grey rounded border-primary px-2 font-medium hover:bg-yellow transition-all hover:text-white group mb-3"
							onClick={() =>
								handleToggleBookmark(actBookmark, id)
							}
						>
							<AiFillHeart
								className={`${
									actBookmark
										? 'text-red'
										: 'text-primary group-hover:text-white transition-all'
								}`}
							/>
							{actBookmark
								? 'Remove wishlist'
								: 'Add to wishlist'}
						</button>
					</div>
					<div className="lg:col-span-4 flex flex-col gap-6 max-lg:row-start-1">
						<Img
							src={cover}
							alt="cover"
							className="mt-5 mx-auto h-52 w-full"
							cover
						/>
					</div>
				</div>
				<div className="flex flex-col gap-y-6">
					<Ingredient ingredients={ingredients} />
					<Method instructionsArr={instructionsArr} />
					<Notes notes={notes} />
				</div>
				<Source source={source} />
			</div>
		</div>
	);
}

const Timer = ({ children }) => (
	<span className="flex items-center gap-2 ">{children}</span>
);

export const TimerBox = ({ prep_time, cook_time, serving }) => (
	<>
		{prep_time && (
			<Timer>
				<BsClockFill />
				Prepare time: {formatTime(prep_time)}
			</Timer>
		)}
		{cook_time && (
			<Timer>
				<BsClockFill />
				Cook time: {formatTime(cook_time)}
			</Timer>
		)}
		{serving && (
			<Timer>
				<FaUser />
				Serves: {serving} people
			</Timer>
		)}
	</>
);

export default SingRecipe;
