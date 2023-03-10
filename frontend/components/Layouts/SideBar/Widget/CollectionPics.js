import { useEffect, useState } from 'react';
import Link from 'next/link';

import useRecipes from 'hook/useRecipes';
import { BsInstagram } from 'react-icons/bs';

import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import CommonSection from './CommonSection';
import { useRecipeContext } from '@context/recipe-context';

function CollectionPics({ isFooter }) {
	const { recipes } = useRecipeContext();
	const [photos, setPhotos] = useState(null);

	useEffect(() => {
		if (recipes) {
			let newArr = recipes.slice(0, 11);
			newArr = newArr.map((item) => ({
				id: item.id,
				src: item.main_image,
				slug: item.slug,
			}));
			setPhotos(newArr);
		}
	}, [recipes]);

	return isFooter ? (
		<div className="relative ">
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
			<Button
				className="lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[270px]"
				icon={{ left: <BsInstagram /> }}
			>
				Follow on Instagram
			</Button>
		</div>
	) : (
		<CommonSection title="Collection pictures">
			<div className="grid grid-cols-3 gap-2">
				{photos &&
					photos.map((pic) => (
						<Link
							key={pic.id}
							href={`/recipes/${pic.slug}`}
							className="block"
						>
							<Img
								src={pic.src}
								alt="pic"
								className="md:h-full h-44 w-full"
								cover
							/>
						</Link>
					))}
			</div>
			<Button
				className="lg absolute top-1/2 left-1/2 -translate-x-1/2 min-w-[270px]"
				icon={{ left: <BsInstagram /> }}
			>
				Follow on Instagram
			</Button>
		</CommonSection>
	);
}

export default CollectionPics;
