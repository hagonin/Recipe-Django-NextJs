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
				src={
					avatar ||
					'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2020/03/allure_post_12.jpg'
				}
				alt="avatar"
				className="overflow-hidden h-36 w-36 mx-auto rounded-full"
				cover
			/>
			<span className="text-lg text-black text-center mt-4 block">
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
