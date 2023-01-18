import SideBarLayout from '../../components/Layouts/SideBarLayout';

function RecipeDetail() {
	return <span>Recipe detail</span>;
}

export default RecipeDetail;

RecipeDetail.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
