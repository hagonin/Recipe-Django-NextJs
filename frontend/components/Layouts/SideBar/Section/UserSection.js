import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import CommonSection from './CommonSection';

function UserSection({ name, bio, avatar }) {
	return (
		<CommonSection
			title="About me"
			center
		>
			<Img
				src={avatar}
				alt="avatar"
			/>
			<span className="text-lg text-black text-center mt-4 block">
				{name}
			</span>
			<p className="text-center mt-1 mb-5 ">{bio}</p>
			<SocialLink
				color="second"
				center
			/>
		</CommonSection>
	);
}

export default UserSection;
