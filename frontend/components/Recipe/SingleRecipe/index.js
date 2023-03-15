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
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 border-y border-border mt-8 py-3 text-sm gap-4">
				<TimerBox
					prep_time={prep_time}
					cook_time={cook_time}
					serving={serving}
				/>
			</div>
			<div
				dangerouslySetInnerHTML={descriptionMarkup}
				className="my-5 text-justify first-letter:capitalize"
			/>
			{images.length > 0 && <Thumbnail images={images} />}

			<div className="border border-border rounded-md p-6 mt-8">
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

						<div className="flex flex-wrap gap-x-6 mt-3 mb-2">
							<TimerBox
								prep_time={prep_time}
								cook_time={cook_time}
								serving={serving}
							/>
						</div>
						<Button
							className="mt-3 tag"
							icon={{
								left: (
									<AiFillHeart
										className={`${
											actBookmark ? 'text-red' : ''
										}`}
									/>
								),
							}}
							onClick={() =>
								handleToggleBookmark(actBookmark, id)
							}
						>
							{actBookmark
								? 'Remove wishlist'
								: 'Add to wishlist'}
						</Button>
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
				<Title title="Ingredients" />

				<Ingredient ingredients={ingredients} />
				{instructionsArr && (
					<Method instructionsArr={instructionsArr} />
				)}

				{notes && (
					<div>
						<Title title="NOTES" />
						<p className="first-letter:uppercase">{notes}</p>
					</div>
				)}
			</div>
		</div>
	);
}

const Title = ({ title }) => (
	<span className="text-base text-black tracking-widest uppercase border-b border-primary pb-1 mt-6 mb-3 inline-block">
		{title}
	</span>
);

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
