import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import Title from '@components/UI/Title';

function Author({ name, avatar, bio }) {
	return (
		<div className="flex items-start md:gap-6 gap-4 py-4 border-y mt-10 ">
			<div>
				<Img
					src={avatar}
					alt="avatar"
					className="h-24 w-24 rounded-full overflow-hidden"
					cover
				/>
			</div>
			<div>
				<Title title={name} />
				<p>{bio}</p>
				{/* <SocialLink color="grey" /> */}
			</div>
		</div>
	);
}

export default Author;
