export const info_recipeform = {
	desc: {
		placeholder:
			'Homemade salad dressing is pretty low hanging fruit if you’re looking to up your cooking game. It’s quick to make, budget-friendly, and tastier than store-bought. Homemade Italian dressing is a prime example. You shake it up in an ordinary jar using pantry staples. The whole operation will take you under 2 minutes and results in enough dressing to get you through a couple of family-sized salads.  ',
		info: 'Share the story behind your recipe and makes it special.',
	},
	photo: {
		info: 'A beautiful picture of the result after cooking from this recipe.',
	},
	instructions: {
		info: 'Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.',
	},
	ingredients: {
		info: (
			<div>
				Enter your ingredients. Those ingredient can be a type of
				ingredient, or any special preparation. Besides, you can group
				your ingredient by use add heading. <br />
				For example:
				<ul className="list-disc px-3">
					<li>1 tablespoon chopped fresh parsley</li>{' '}
					<li>½ teaspoon lemon juice</li>
					<li>
						1 cup small pasta such as cavatelli, orzo, or ditalini
					</li>
				</ul>
			</div>
		),
	},
	search_vector: {
		info: 'Keywords must have no special characters. Only text and spaces are accepted.',
	},
	serving: {
		info: <div>You can put number of people or group of people</div>,
	},
	source: {
		info: "If your recipe is inspired by or derived from another source, kindly honor the original author's copyright by including a reference to the source on your website.",
	},
	password: (
		<>
			<span>Password must use a combination of these:</span>
			<ul className="list-disc">
				<li>Least at 8 characters</li>
				<li>At least 1 lowercase and 1 uppercase letter</li>
				<li>At least 1 numeric character</li>
				<li>At least 1 special character</li>
			</ul>
		</>
	),
};
