import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Button from '@components/UI/Button';
import { useAuthContext } from '@context/auth-context';
import Link from 'next/link';

function User() {
	const { user } = useAuthContext();
	console.log('user at user page', user);
	return (
		<div className="container my-14">
			<div className="p-5 border rounded-md">
				<h1>Profile</h1>
				<h2>ID: {user?.user_id}</h2>
				<h2>Avatar: {user?.avatar}</h2>
				<h2>Bio: {user?.bio}</h2>
				<h2>User Name: {user?.username}</h2>
				<h2>Bookmarks: {user?.bookmarks || 'empty'}</h2>
				<p>Email: {user?.email}</p>
			</div>
			<h2>Manage recipe of user</h2>
			<h3>All Recipe of user</h3>
			<Button
				type="link"
				href="/recipes/addnewrecipe"
			>
				Add recipe
			</Button>
			<Button
				type="link"
				href="/user/updateprofile"
			>
				Update Profile
			</Button>
			<Link href="/login">Login</Link>
		</div>
	);
}

export default User;

User.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
