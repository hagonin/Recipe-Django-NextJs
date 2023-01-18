import SideBarLayout from '../../components/Layouts/SideBarLayout';

function Category() {
	return <span>Categories about breakfast</span>;
}

export default Category;

Category.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
