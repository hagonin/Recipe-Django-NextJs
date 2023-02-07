import Link from 'next/link';
import { images } from '@utils/constants';
import Img from '@components/UI/Image';

function Logo() {
	return (
		<Link href="/">
			<Img
				src={images.logo}
				alt="logo"
				className="lg:h-52 lg:w-80 h-20 w-28"
			/>
		</Link>
	);
}

export default Logo;
