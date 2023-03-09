import Link from 'next/link';
import { images } from '@utils/constants';

import Img from '../Image';

function Slide({ id, image, name, description, slug }) {
	return (
		<Link
			key={id}
			href="/recipes/seafood"
			className="keen-slider__slide rounded relative group"
		>
			<span className="absolute inset-0 bg-[rgba(255,255,255,0.35)] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
			<Img
				src={image || images.recipe1}
				alt={`slide ${id}`}
				className="w-full h-[500px]"
				cover
			/>
			<div className="absolute bottom-0 left-0 w-full z-20 bg-primaryTransparent text-center py-3 px-5">
				<Link
					className="text-3xl text-white font-serif"
					href={`/recipes/${slug}`}
				>
					{name}
				</Link>
				<p className="leading-6 text-white mt-1 line-clamp-2">
					{description}
				</p>
			</div>
		</Link>
	);
}

export default Slide;
