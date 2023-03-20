function uppercaseFirstLetter(str) {
	const x = str.trim();
	const result = x.replace(x[0], x[0]?.toUpperCase());
	return result;
}

export default uppercaseFirstLetter;
