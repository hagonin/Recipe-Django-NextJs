import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import Link from 'next/link';

function RecipeDetail() {
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
	return (
		<>
			<span>Recipe detail</span>
			<Link href="/recipes">Back recipe page</Link>
			<RelatedRecipe recipes={relatedRecipes} />
		</>
	);
}

export default RecipeDetail;

RecipeDetail.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
