import { EXIST_RECIPE } from './constants';

function handleIngredientFromArr(ingredients) {
	if (ingredients) {
		const item = [];
		const obj = {};
		let exits_recipe;
		ingredients.forEach((ingredient) => {
			if (ingredient?.heading === 'null' || !ingredient?.heading) {
				item.push(ingredient);
			} else {
				const { heading, ...rest } = ingredient;
				if (obj[heading]) {
					obj[heading] = [rest, ...obj[heading]];
				} else {
					obj[heading] = [rest];
				}
			}
			exits_recipe = ingredient.recipe;
		});

		const group = Object.keys(obj).map((key) => ({
			heading: key,
			items: obj[key],
		}));

		return {
			item,
			group,
			exist_recipe: exits_recipe,
		};
	}
}

export default handleIngredientFromArr;
