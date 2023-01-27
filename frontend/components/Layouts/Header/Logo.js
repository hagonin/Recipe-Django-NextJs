import Img from '@components/UI/Image';
import Link from 'next/link';

function Logo() {
	return (
		<Link href="/">
			<Img
				src="/static/images/logo.png"
				alt="logo"
				className="lg:h-52 lg:w-80 h-20 w-28"
			/>
		</Link>
	);
}

export default Logo;
