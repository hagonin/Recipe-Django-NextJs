import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import Image from 'next/image';
import Link from 'next/link';

function RecipeCard({ name, image, date, id, summary, isSlide }) {
	return (
		<div
			className={`${summary} &&
				'grid lg:grid-cols-12 grid-cols-1 gap-8 mt-8 pb-8 border-b border-border' ${
					isSlide && 'keen-slider__slide border-none'
				}`}
		>
			<Link
				href={`/recipes/${id}`}
				className="relative block lg:col-span-5"
			>
				<Image
					fill
					src={
						image ||
						'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg'
					}
					alt="recipe"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="!relative rounded"
					priority
				/>
			</Link>
			<div className="lg:col-span-7">
				<Link
					href={`/recipes/${id}`}
					className={`${
						summary ? 'text-2xl ' : 'text-lg mt-4'
					}  text-black line-clamp-2   hover:text-primary transition-all duration-300`}
				>
					{name}
				</Link>
				<span className="text-sm">{date}</span>
				{summary && (
					<>
						<p className="mt-3 line-clamp-6">{summary}</p>
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
		</div>
	);
}

export default RecipeCard;
