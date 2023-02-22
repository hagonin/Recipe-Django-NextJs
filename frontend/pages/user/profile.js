import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Tabs from '@components/UI/Tabs';
import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

function User() {
	const { user } = useAuthContext();
	console.log('user at user page', user);
	return (
		<div className="container my-14">
			<h1 className="text-center">Profile</h1>
			<div className="flex mt-10 items-center gap-6">
				<Img
					src={user?.avatar || images.defaultAvatar}
					alt="avatar"
					className="h-52 w-52 border border-border rounded-full overflow-hidden"
					cover
				/>
				<div className="flex flex-col">
					<h2>{user?.username}</h2>
					<span className="text-lg mt-1">Email: {user?.email}</span>
					<Button
						type="link"
						href="/user/updateprofile"
						className="mt-3"
					>
						Update Profile
					</Button>
				</div>
			</div>
			<div className="mt-6 bg-primaryLight rounded-md py-4 px-5 flex gap-4 items-center">
				<Img
					src={images.bio}
					className="h-10 w-10"
					alt="bio"
				/>
				<p>{user?.bio}</p>
			</div>
			<Tabs />
		</div>
	);
}

export default User;

User.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
