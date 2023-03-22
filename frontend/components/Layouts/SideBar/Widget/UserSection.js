import { memo } from 'react';
import { images } from '@utils/constants';
import uppercaseFirstLetter from '@utils/uppercaseFirstLetter';
import CommonSection from './CommonSection';
import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';

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
			<p className="text-center mt-1 mb-5 line-clamp-3">
				{uppercaseFirstLetter(bio) || (
					<span className="italic">You have not added any bio.</span>
				)}
			</p>
			<SocialLink
				color="second"
				center
			/>
		</CommonSection>
	);
}

export default memo(UserSection);
