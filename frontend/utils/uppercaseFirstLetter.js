function uppercaseFirstLetter(str) {
	const result = str.replace(str[0], str[0]?.toUpperCase());
	return result;
}

export default uppercaseFirstLetter;
