function formatTime(minutes) {
	if (minutes < 60) {
		return `${minutes} minutes`;
	} else {
		const min = minutes % 60;
		const h = parseInt(minutes / 60);
		return `${h} hour ${min} minutes`;
	}
}

export const formatCounter = (seconds) => {
	const objTime = getTimeFromSeconds(seconds);
	const hour = objTime.hour < 10 ? `0${objTime.hour}` : objTime.hour;
	const min = objTime.min < 10 ? `0${objTime.min}` : objTime.min;
	const second = objTime.second < 10 ? `0${objTime.second}` : objTime.second;
	return `${hour}:${min}:${second}`;
};

const getTimeFromSeconds = (seconds) => {
	let second = 0,
		min = 0,
		hour = 0;
	second = seconds % 60;
	min = parseInt(seconds / 60);
	if (min > 60) {
		hour = parseInt(min / 60);
		min = min % 60;
	}
	return { second, min, hour };
};
export default formatTime;
