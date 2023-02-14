import ManageRecipe from './SideBar/AccountManage';

function ManageRecipeLayout({ children }) {
	return (
		<div className="container grid md:grid-cols-12 grid-cols-1 md:gap-8 gap-4 my-14">
			<div className="md:col-span-3">
				<ManageRecipe />
			</div>
			<div className="md:col-span-9">{children}</div>
		</div>
	);
}

export default ManageRecipeLayout;
