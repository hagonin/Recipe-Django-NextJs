import Link from 'next/link';
import { images } from '@utils/constants';

import Img from '../Image';
import createMarkup from '@utils/createMarkup';

function Slide({ id, image, name, description, slug }) {
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
					alt={`slide ${id}`}
					className="w-full h-[500px]"
					cover
				/>
			</Link>
			<div className="absolute bottom-0 left-0 w-full z-20 bg-primaryTransparent text-center py-3 px-5">
				<Link
					className="text-2xl text-white font-serif line-clamp-1 capitalize"
					href={`/recipes/${slug}`}
				>
					{name}
				</Link>
				<div
					className="text-lg leading-6 text-white mt-1 line-clamp-2 bg-transparent"
					dangerouslySetInnerHTML={createMarkup(description)}
				/>
			</div>
		</div>
	);
}

export default Slide;
