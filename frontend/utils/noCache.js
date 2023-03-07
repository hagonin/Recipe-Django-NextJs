const noCache = () => {
	const newDate = Date.now();
	return `?cb=${newDate}`;
};
export default noCache;
