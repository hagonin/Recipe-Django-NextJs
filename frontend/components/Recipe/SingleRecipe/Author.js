import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import Title from '@components/UI/Title';
import Link from 'next/link';

function Author({ name, avatar, bio, slug }) {
	return (
		<div className="flex items-start md:gap-4 gap-2 py-4 border-y mt-10 ">
			<Link href={`/recipes/${slug}/author`}>
				<Img
					src={avatar}
					alt="avatar"
					className="h-24 w-24 rounded-full overflow-hidden border"
					cover
				/>
			</Link>
			<div>
				<Link href={`/recipes/${slug}/author`}>
					<Title
						title={name}
						bottom="mb-2"
					/>
				</Link>
				<p className="line-clamp-4">{bio}</p>
				{/* <SocialLink color="grey" /> */}
			</div>
		</div>
	);
}

export default Author;
