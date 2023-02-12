import RecipeCard from '@components/Recipe/RecipeCard';

function LatestRecipes() {
	const recipes = [
		{
			id: 1,
			name: 'Banana and Blueberry Cereal',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/06/promo_2_2item.jpg',
			date: 'January 12, 2021',
		},
		{
			id: 2,
			name: 'Banana and Blueberry Cereal',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/06/promo_2_2item.jpg',
			date: 'January 12, 2021',
		},
		{
			id: 3,
			name: 'Banana and Blueberry Cereal Banana and Blueberry Cereal Banana and Blueberry Cereal',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/06/promo_2_2item.jpg',
			date: 'January 12, 2021',
		},
	];
	return (
		<div className="md:col-span-8 grid lg:grid-cols-2 grid-cols-1 gap-x-6">
			{recipes.map((recipe) => (
				<RecipeCard
					key={recipe.id}
					{...recipe}
					smallCard
					border
					className="grid grid-cols-2 gap-4"
				/>
			))}
		</div>
	);
}

export default LatestRecipes;
