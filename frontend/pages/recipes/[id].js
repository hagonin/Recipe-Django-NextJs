import api from '@services/axios';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';
import Thumbnail from '@components/UI/Slider/Thumbnail';

function Recipe() {
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

	// const { image_url, user, slug, ..._recipe } = recipe;
	const images = [
		{
			id: 1,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 2,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 3,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 4,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 5,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 6,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
	];
	return (
		<>
			{/* <SingRecipe
				{..._recipe}
				cover={image_url}
				author={user}
				title={slug}
			/> */}
			<Thumbnail images={images} />
			<RelatedRecipe recipes={relatedRecipes} />
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

// export async function getStaticProps({ params }) {
// 	const res = await api.get(`/recipe/recipe/${params.id}/`);
// 	const recipe = res.data;

// 	// get category and fetch related recipe here

// 	return {
// 		props: {},
// 	};
// }

// export async function getStaticPaths() {
// 	const res = await api.get('/recipe/recipe/');
// 	const paths = res.data.map((item) => ({
// 		params: {
// 			id: item.id.toString(),
// 		},
// 	}));
// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }
