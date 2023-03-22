import { images } from '@utils/constants';

import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';

function WebInfo() {
	return (
		<div className="md:col-span-4 ">
			<Img src={images.logo} alt="logo" className="h-20 w-44" />

			<p className="mb-5 text-justify w-[95%]">
				Discover the benefits of home-cooked meals and improve your health with
				HomeCook's guidance. Start cooking with ease and say goodbye to
				convenience food cravings.
			</p>
			<SocialLink color="black" />
		</div>
	);
}

export default WebInfo;
