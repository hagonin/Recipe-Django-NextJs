import Button from '@components/UI/Button';

function User() {
	return (
		<div className="container my-14">
			<h1>Manage recipe of user</h1>
			<h2>All Recipe of user</h2>
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
