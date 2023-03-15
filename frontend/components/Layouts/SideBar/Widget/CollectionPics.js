import Link from 'next/link';
import Img from '@components/UI/Image';
import CommonSection from './CommonSection';
import { useRecipeContext } from '@context/recipe-context';

function CollectionPics({ isFooter }) {
	const { photos } = useRecipeContext();

	return isFooter ? (
		<div className="flex flex-wrap lg:h-40 md:48 h-52 overflow-hidden">
			{photos &&
				photos.map((pic) => (
					<Link
						key={pic.id}
						href={`/recipes/${pic.slug}`}
						className="block lg:flex-1 md:basis-1/4 basis-1/2 h-full"
					>
						<Img
							src={pic.src}
							alt="pic"
							className="h-full w-full"
							cover
						/>
					</Link>
				))}
		</div>
	) : (
		<CommonSection title="Collection pictures">
			<div className="grid lg:grid-cols-3 gap-2">
				{photos &&
					photos.map((pic) => (
						<Link
							key={pic.id}
							href={`/recipes/${pic.slug}`}
							className="block overflow-hidden"
						>
							<Img
								src={pic.src}
								alt="pic"
								className="lg:h-32 lg:h-20 md:h-36 h-64 max-md:w-[90%] mx-auto"
								cover
							/>
						</Link>
					))}
			</div>
		</CommonSection>
	);
}

export default CollectionPics;
