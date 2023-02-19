import api from '@services/axios';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';

function Recipe({ recipe }) {
	console.log(recipe);
	const relatedRecipes = [
		{
			id: 1,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 2,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 3,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 4,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 5,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
	];

	const { images, ..._recipe } = recipe;
	const imagesDefault = images.filter((item) => item.default)[0];
	const imagesRest = images.filter((item) => !item.default);
	return (
		<>
			<SingRecipe
				{..._recipe}
				imagesDefault={imagesDefault}
				imagesRest={imagesRest}
			/>
			<RelatedRecipe recipes={relatedRecipes} />
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

export async function getStaticProps({ params }) {
	const res = await api.get(`/recipe/recipe/${params.id}/`);
	const recipe = res.data;

	// get category and fetch related recipe here

	return {
		props: { recipe },
	};
}

export async function getStaticPaths() {
	const res = await api.get('/recipe/recipe/');
	const paths = res.data.map((item) => ({
		params: {
			id: item.id.toString(),
		},
	}));
	return {
		paths,
		fallback: false,
	};
}
