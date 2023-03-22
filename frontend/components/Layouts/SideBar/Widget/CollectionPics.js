import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecipeContext } from '@context/recipe-context';
import Loader from '@components/UI/Loader';
import Img from '@components/UI/Image';
import CommonSection from './CommonSection';

function CollectionPics({ isFooter }) {
	const { photos } = useRecipeContext();
	const [photosSelect, setPhotosSelect] = useState(null);

	const onSizeChange = () => {
		const size = window.innerWidth;
		photos && isFooter && setPhotosSelect(() => [...photos].slice(0, 6));

		if (!isFooter && photos) {
			size < 1024 && setPhotosSelect(() => [...photos].slice(6, 9));
			size >= 1024 && setPhotosSelect(photos);
		}
	};

	useEffect(() => {
		onSizeChange();
		window.addEventListener('resize', onSizeChange);
		return () => {
			window.removeEventListener('resize', onSizeChange);
		};
	}, [photos]);

	return isFooter ? (
		<div className="flex flex-wrap lg:h-40 md:48 h-52 overflow-hidden">
			{photosSelect ? (
				photosSelect.map((pic) => (
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
				))
			) : (
				<Loader type="square" />
			)}
		</div>
	) : (
		<CommonSection title="Collection pictures">
			<div className="grid lg:grid-cols-3 gap-2">
				{photosSelect ? (
					photosSelect.map((pic) => (
						<Link
							key={pic.id}
							href={`/recipes/${pic.slug}`}
							className="block overflow-hidden"
						>
							<Img
								src={pic.src}
								alt="pic"
								className="lg:h-24  md:h-36 h-64 max-md:w-[90%] mx-auto"
								cover
							/>
						</Link>
					))
				) : (
					<>
						<Loader type="square-small" />
						<Loader type="square-small" />
						<Loader type="square-small" />
					</>
				)}
			</div>
		</CommonSection>
	);
}

export default CollectionPics;
