import uppercaseFirstLetter from './uppercaseFirstLetter';

export function getInstructionAsDrawHtml(ins = []) {
	return ins
		.filter(({ content }) => content)
		.map(({ content }, index) => `<p>${content}</p>`)
		.join('');
}

export function getInstructionAsArr(instructions = '') {
	let ins = instructions.split('<p>');
	ins.shift();
	ins = ins.map((item) => item.split('</p>'));
	ins = ins.map((item) => {
		return { content: item[0] };
	});
	return ins;
}
