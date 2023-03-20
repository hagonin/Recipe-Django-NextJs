function uppercaseFirstLetter(str) {
	const x = str.trim();
	console.log(x);
	const result = x.replace(x[0], x[0]?.toUpperCase());
	console.log(result);
	return result;
}

export default uppercaseFirstLetter;
