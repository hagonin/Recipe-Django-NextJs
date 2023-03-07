function handleIngredientFromArr(ingredients) {
	if (ingredients) {
		const item = [];
		const obj = {};
		ingredients.forEach((ingredient) => {
			if (ingredient?.heading === 'null') {
				item.push({ ...ingredient });
			} else {
				const { heading, ...rest } = ingredient;
				if (obj[heading]) {
					obj[heading] = [rest, ...obj[heading]];
				} else {
					obj[heading] = [rest];
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
