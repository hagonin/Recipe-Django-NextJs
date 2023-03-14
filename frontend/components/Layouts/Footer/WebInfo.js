import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import { images } from '@utils/constants';

function WebInfo() {
	return (
		<div className="md:col-span-4 ">
			<Img
				src={images.logo}
				alt="logo"
				className="h-20 w-44"
			/>

			<p className="mb-5">
				We all love convenience food, but one of the simplest ways to
				improve your health is by preparing more home-cooked meals.
				HomeCook will help you how to get started.
			</p>
			<SocialLink color="black" />
		</div>
	);
}

export default WebInfo;
