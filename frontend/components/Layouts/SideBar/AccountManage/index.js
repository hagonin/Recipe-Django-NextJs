import Link from 'next/link';

function AccountManage() {
	return (
		<div className="border rounded-md p-6">
			<Link
				className="px-3 py-2 text-black block rounded-md hover:bg-[rgba(0,0,0,0.05)]"
				href="/user/all-recipes"
			>
				All Recipes
			</Link>
			<Link
				className="px-2 py-2 text-black block rounded-md hover:bg-[rgba(0,0,0,0.05)]"
				href="/recipes/addnewrecipe"
			>
				Add recipe
			</Link>
		</div>
	);
}

export default AccountManage;
