function handleUnit(unit, quantity) {
	let total = 0;
	const indexFraction = quantity?.indexOf('/');
	if (indexFraction > -1) {
		total += quantity[indexFraction - 1] / quantity[indexFraction + 1];
		total += quantity.slice(0, indexFraction - 1).trim() * 1;
	} else {
		total += quantity * 1;
	}

	switch (true) {
		case unit === 'teaspoon(s)' && total <= 1:
			return 'teaspoon';
		case unit === 'teaspoon(s)' && total > 1:
			return 'teaspoons';
		case unit === 'tablespoon(s)' && total <= 1:
			return 'tablespoon';
		case unit === 'tablespoon(s)' && total > 1:
			return 'tablespoons';
		case unit === 'pound(s)' && total <= 1:
			return 'pound';
		case unit === 'pound(s)' && total > 1:
			return 'pounds';
		case (unit === 'cup' || unit === 'cup(s)') && total <= 1:
			return 'cup';
		case (unit === 'cup' || unit === 'cup(s)') && total > 1:
			return 'cups';
		default:
			return unit;
	}
}

export { handleUnit };
