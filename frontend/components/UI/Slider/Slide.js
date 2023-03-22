import Link from 'next/link';
import { images } from '@utils/constants';

import Img from '../Image';
import getPlainTextFromHtml from '@utils/getPlainTextFromHtml';

function Slide({ id, image, name, description, slug }) {
	const summary = getPlainTextFromHtml(description);

	return (
		<div
			key={id}
			className="keen-slider__slide rounded relative group"
		>
			<Link
				href={`/recipes/${slug}`}
				className="relative block hover:bg-red z-10  transition-all duration-300 after:content-[''] after:absolute after:inset-0 after:hover:bg-[rgba(255,255,255,0.4)] after:transition-all after:duration-500"
			>
				<Img
					src={image || images.recipe1}
					alt='recipe'
					className="w-full h-[500px]"
					cover
				/>
			</Link>
			<div className="absolute bottom-0 left-0 w-full z-20 bg-primaryTransparent text-center py-3 px-5">
				<Link
					className="text-2xl text-white font-serif line-clamp-1 capitalize hover:text-[rgba(255,255,255,0.8)] transition-all"
					href={`/recipes/${slug}`}
				>
					{name}
				</Link>
				<p className="text-base leading-6  text-white mt-1 h-12 line-clamp-2 bg-transparent [&>*:nth-child(3)]:capitalize">
					{summary}
				</p>
			</div>
		</div>
	);
}

export default Slide;
