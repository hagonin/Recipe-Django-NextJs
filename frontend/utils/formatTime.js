function formatTime(minutes) {
	if (minutes < 60) {
		return `${minutes} minutes`;
	} else {
		const min = minutes % 60;
		const h = parseInt(minutes / 60);
		return `${h} hour ${min} minutes`;
	}
}

export default formatTime;

