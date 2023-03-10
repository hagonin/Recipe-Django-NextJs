function getRandomRecipes(recipes = [], number = 9) {
	const arr = Array.from(
		{ length: number },
		() => recipes[Math.floor(Math.random() * recipes.length)]
	);

	const results = arr.filter((item) => item);

	return results;
}

export default getRandomRecipes;
