import { BsClock, BsClockFill } from 'react-icons/bs';
import { BsBookmarksFill } from 'react-icons/bs';

import { FaUser } from 'react-icons/fa';
import Img from '@components/UI/Image';
import formatDate from '@utils/formatdate';
import createMarkup from '@utils/createMarkup';
import Thumbnail from '@components/UI/Slider/Thumbnail';
import Ingredient from './Ingredient';
import Tippy from '@tippyjs/react';
import getAverageReviews from '@utils/getAverageReviews';
import Rating from '@components/UI/Reviews/Rate';
import formatTime from '@utils/formatTime';
import { getInstructionAsArr } from '@utils/handleInstruction';
import Check from './Check';

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
			<div className="flex gap-2 justify-center items-start ">
				<h1 className="text-center font-serif">{title}</h1>
				<Tippy
					content={
						<span>
							{actBookmark ? 'Remove bookmark' : 'Add bookmark'}
						</span>
					}
				>
					<button
						onClick={() => handleToggleBookmark(actBookmark, id)}
						className={`text-xl ml-2  ${
							actBookmark ? 'text-primary' : 'text-black'
						}`}
					>
						<BsBookmarksFill />
					</button>
				</Tippy>
			</div>
			<span className="block text-center font-medium mt-2">
				{updated_at_format} / {author}
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
				className="mt-5 mb-10 text-justify"
			/>
			{images.length > 0 && <Thumbnail images={images} />}

			<div className="border border-border rounded-md p-6 mt-10">
				<div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 md:gap-4 gap-6">
					<div className="lg:col-span-8 ">
						<h3 className="font-serif">{title}</h3>
						<span className="block mt-1">
							{updated_at_format} / {author}
						</span>
						{rating && (
							<div className="text-center flex items-center justify-center gap-2">
								<Rating
									number={rating}
									count={reviews_count}
								/>
							</div>
						)}

						<div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 mt-3 mb-2">
							<TimerBox
								prep_time={prep_time}
								cook_time={cook_time}
								serving={serving}
							/>
						</div>

						<Title title="Ingredients" />
						<Ingredient ingredients={ingredients} />
					</div>
					<div className="lg:col-span-4 flex flex-col gap-6 max-lg:row-start-1">
						<Img
							src={cover}
							alt="cover"
							className="mt-5 mx-auto h-52 w-52"
							cover
						/>
					</div>
				</div>
				<Title title="Method" />
					{instructionsArr.map(({ content }, index) => (
						<Check
							key={index}
							label={`${index + 1}) ${content}`}
						/>
					))}
				{notes && (
					<>
						<Title title="NOTE" />
						<p>{notes}</p>
					</>
				)}
			</div>
		</div>
	);
}

const Title = ({ title }) => (
	<h6 className=" text-black uppercase border-b border-primary pb-1 mt-6 mb-3 inline-block">
		{title}
	</h6>
);

const Timer = ({ children }) => (
	<span className="flex items-center gap-2">{children}</span>
);

const TimerBox = ({ prep_time, cook_time, serving }) => (
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
