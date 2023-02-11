import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import Image from 'next/image';
import Link from 'next/link';

function Card({ name, image, date, id }) {
	return (
		<div>
			<Link
				href="recipes/category/breadfast"
				className="relative block"
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
			<Link
				href="recipes/category/breadfast"
				className="text-lg text-black line-clamp-2 mt-4  hover:text-primary transition-all duration-300"
			>
				{name}
			</Link>
			<span className="text-sm ">{date}</span>
		</div>
	);
}

export default Card;
