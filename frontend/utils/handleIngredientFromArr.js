import { EXIST_RECIPE } from './constants';

function handleIngredientFromArr(ingredients) {
	if (ingredients) {
		const item = [];
		const obj = {};
		ingredients.forEach((ingredient) => {
			if (ingredient?.heading === 'null' || !ingredient?.heading) {
				item.push({ ...ingredient, recipe: EXIST_RECIPE });
			} else {
				const { heading, ...rest } = ingredient;
				if (obj[heading]) {
					obj[heading] = [rest, ...obj[heading]];
				} else {
					obj[heading] = [{ ...rest, recipe: EXIST_RECIPE }];
				}
			}
		});
		const group = Object.keys(obj).map((key) => ({
			heading: key,
			items: obj[key],
		}));
		return {
			item,
			group,
		};
	}
}

export default handleIngredientFromArr;
