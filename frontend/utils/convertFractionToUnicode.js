function convertFractiontoUnicode(fraction) {
	const fractionParts = fraction.split('/');
	const numerator = parseInt(fractionParts[0]);
	const denominator = parseInt(fractionParts[1]);
	switch (true) {
		case numerator === 1 && denominator === 2:
			return String.fromCharCode(189);
		case numerator === 1 && denominator === 3:
			return String.fromCharCode(8531);
		case numerator === 1 && denominator === 4:
			return String.fromCharCode(188);
		case numerator === 1 && denominator === 5:
			return String.fromCharCode(8533);
		case numerator === 2 && denominator === 3:
			return String.fromCharCode(8532);
		case numerator === 2 && denominator === 5:
			return String.fromCharCode(8534);
		case numerator === 3 && denominator === 4:
			return String.fromCharCode(190);

		default:
			return fraction;
	}
}

export { convertFractiontoUnicode };
