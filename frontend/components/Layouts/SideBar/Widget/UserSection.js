import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import { images } from '@utils/constants';
import { garamond } from '@utils/fonts';
import CommonSection from './CommonSection';

function UserSection({ name, bio, avatar }) {
	return (
		<CommonSection
			title="About me"
			center
		>
			<Img
				src={avatar || images.defaultAvatar}
				alt="avatar"
				className="overflow-hidden h-36 w-36 mx-auto rounded-full"
				cover
			/>
			<span
				className={`text-2xl font-medium text-black font-serif text-center mt-4 block`}
			>
				{name}
			</span>
			<p className="text-center mt-1 mb-5 ">
				{bio ||
					' Sed pellentesque nibh enim, quis euismod enim lacinia nec.Phasellus quam diam, semper in erat eu. Consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec.'}
			</p>
			<SocialLink
				color="second"
				center
			/>
		</CommonSection>
	);
}

export default UserSection;
