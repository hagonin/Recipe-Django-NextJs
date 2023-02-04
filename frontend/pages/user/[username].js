import Button from '@components/UI/Button';
import { useAuthContext } from '@context/auth-context';

function User() {
	const { user } = useAuthContext();
	return (
		<div className="container my-14">
			<div className="p-5 border rounded-md">
				<h1>Profile</h1>
				<h2>User Name: {user.username}</h2>
				<p>Email: {user.email}</p>
			</div>
			<h2>Manage recipe of user</h2>
			<h3>All Recipe of user</h3>
			<Button
				type="link"
				href="/recipes/addnewrecipe"
			>
				Add recipe
			</Button>
		</div>
	);
}

export default User;
