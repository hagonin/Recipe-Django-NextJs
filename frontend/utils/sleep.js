function sleep(ms, data) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, ms);
	});
}

export default sleep;
