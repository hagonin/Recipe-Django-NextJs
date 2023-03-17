import Link from 'next/link';
import { images } from '@utils/constants';
import Image from 'next/image';

function Logo() {
	return (
		<Link
			href="/"
			className="relative lg:w-80 w-28 h-full block"
		>
			<Image
				src={images.logo}
				alt="logo"
				fill
				className=" h-full w-full"
				sizes="(max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              33vw"
			/>
		</Link>
	);
}

export default Logo;
