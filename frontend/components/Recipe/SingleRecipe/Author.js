import Img from '@components/UI/Image';
import Title from '@components/UI/Title';

function Author({ name, avatar, bio }) {
	return (
		<div className="flex items-start md:gap-6 gap-4 py-4 border-y mt-10">
			<div>
				<Img
					src={avatar}
					alt="avatar"
					className="h-24 w-24 rounded-full relative top-1"
				/>
			</div>
			<div>
				<Title title={name} />
				<p className="relative -top-3">{bio}</p>
			</div>
		</div>
	);
}

export default Author;
