import { BsClock, BsPinterest, BsPrinter } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import formatDate from '@utils/formatdate';
import Check from './Check';

function SingRecipe({
	updated_at,
	author,
	imagesDefault,
	prep_time,
	cook_time,
	instructions,
	serving,
	title,
	description,
	notes,
	ingredients,
	imagesRest,
}) {
	const updated_at_format = formatDate(updated_at);
	return (
		<div>
			<h1 className="text-center">{title}</h1>
			<span className="block text-center font-medium mt-3">
				{updated_at_format} / by {author}
			</span>
			<Img
				src={imagesDefault.image_url}
				alt={imagesDefault.caption}
				className="mt-5 lg:w-1/2 mx-auto "
			/>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 border-y border-border mt-8 py-3 text-sm gap-4">
				<div className="flex items-center gap-2">
					<BsClock /> <span>Pre-cook: {prep_time} minutes</span>
				</div>
				<div className="flex items-center gap-2">
					<BsClock /> <span>Cook-cook: {cook_time} minutes</span>
				</div>
				<div className="flex items-center gap-2">
					<FaUser /> <span>Serves: {serving} people</span>
				</div>
			</div>
			<p className="mt-5">{description}</p>
			<div className="flex lg:gap-6 md:gap-4 gap-2 mt-5">
				{imagesRest.map((img, index) => (
					<Img
						key={index}
						src={img.image_url}
						alt={img.caption}
						className="h-full"
					/>
				))}
			</div>
			

			<div className="border border-border rounded-md p-6 mt-10">
				<div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-6 md:gap-4 gap-6">
					<div className="lg:col-span-8">
						<h2 className="text-center">{title}</h2>
						<span className="block text-center mt-3">
							{updated_at_format} / by <b>{author}</b>
						</span>
						<div className="flex flex-col gap-3 mt-5 text-sm">
							<span className="flex items-center gap-2">
								<BsClock />
								<span>Pre-cook: {prep_time} minutes</span>
							</span>
							<span className="flex items-center gap-2">
								<BsClock />
								<span>Cook-cook: {cook_time} minutes</span>
							</span>
							<span className="flex items-center gap-2">
								<FaUser />
								<span>Serves: {serving} people</span>
							</span>
						</div>
						<p className="mt-4">{description}</p>
						<Title title="Ingredients" />
						<div className="flex flex-col gap-3">
							{ingredients.map((ingredient, index) => (
								<Check
									key={index}
									label={`${ingredient.quantity} ${ingredient.unit} ${ingredient.title} ${ingredient.description}`}
								/>
							))}
						</div>
					</div>
					<div className="lg:col-span-4 flex flex-col gap-6 max-lg:row-start-1">
						<Img
							src={imagesDefault.image_url}
							alt={imagesDefault.caption}
							className="mt-5 mx-auto "
						/>
						<Button icon={{ left: <BsPrinter /> }}>
							Print recipe
						</Button>
						<Button icon={{ left: <BsPinterest /> }}>
							Pin recipe
						</Button>
					</div>
				</div>
				<Title title="Instructions" />
				<p dangerouslySetInnerHTML={{ __html: instructions }} />
				<Title title="NOTE" />
				<p>{notes}</p>
			</div>
		</div>
	);
}

const Title = ({ title }) => (
	<span className="text-lg text-black uppercase border-b border-primary pb-1 mt-6 mb-4 inline-block">
		{title}
	</span>
);
export default SingRecipe;
