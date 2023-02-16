import Link from 'next/link';

import { BsInstagram } from 'react-icons/bs';

import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import CommonSection from './CommonSection';

function CollectionPics({ isFooter }) {
	//useSWR
	const picsRandom = [
		{
			id: 1,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/17.jpg',
		},
		{
			id: 2,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/20.jpg',
		},
		{
			id: 3,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/23.jpg',
		},
		{
			id: 4,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/17.jpg',
		},
		{
			id: 5,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/20.jpg',
		},
		{
			id: 6,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/23.jpg',
		},
		{
			id: 7,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/17.jpg',
		},
		{
			id: 8,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/20.jpg',
		},
		{
			id: 9,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/23.jpg',
		},
	];
	return isFooter ? (
		<div className="relative">
			<div className="flex">
				{picsRandom.map((pic) => (
					<Link
						key={pic.id}
						href={`/recipes/${[pic.id]}`}
					>
						<Img
							src={pic.cover}
							alt="pic"
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
				{picsRandom.map((pic) => (
					<Link
						key={pic.id}
						href={`/recipes/${[pic.id]}`}
					>
						<Img
							src={pic.cover}
							alt="pic"
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
