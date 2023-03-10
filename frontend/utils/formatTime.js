function formatTime(minutes) {
	if (minutes < 60) {
		return `${minutes}min`;
	} else {
		const min = minutes % 60;
		const h = parseInt(minutes / 60);
		return `${h}h${min}min`;
	}
}

export default formatTime;
