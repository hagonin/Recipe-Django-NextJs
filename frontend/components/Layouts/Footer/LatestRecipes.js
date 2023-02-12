function LatestRecipes({ recipes = [1, 2, 3, 4, 5, 6] }) {
	return (
		<div className="md:col-span-8 grid md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 gap-2">
			{recipes.map((recipe) => (
				<h3 className="border">Recipe</h3>
			))}
		</div>
	);
}

export default LatestRecipes;
