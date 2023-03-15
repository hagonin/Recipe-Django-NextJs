import uppercaseFirstLetter from './uppercaseFirstLetter';

function getPlainTextFromHtml(content = '') {
	const txt1 = content.replace(/<[^>]*>/g, '');
	const txt2 = uppercaseFirstLetter(txt1);
	return txt2;
}

export default getPlainTextFromHtml;
