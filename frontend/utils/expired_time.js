export const EXPIRED_TIMER = 5 * 60 * 60;
export const KEY_EXPIRED = 'HOMECOOK_KEY_EXPIRED';
export const STATUS_EXPIRED = 429;

const getTimeExpired = () => {
	const expired_date = getCurrentTime() + EXPIRED_TIMER;
	return expired_date;
};

export const getCurrentTime = () => {
	const time = new Date();
	return time.getTime() / 1000;
};

export const handleExpired = (idUserCurrent) => {
	!checkExpiredTime(idUserCurrent) && setExpiredTime(idUserCurrent);
};

export const checkExpiredTime = (idUserCurrent) => {
	return localStorage.getItem(`${KEY_EXPIRED}_${idUserCurrent}`);
};

export const getExpiredTimeFromLocalStage = (id) => {
	return JSON.parse(localStorage.getItem(`${KEY_EXPIRED}_${id}`))
		.expired_time;
};

export const removeExpiredTime = (id) =>
	localStorage.removeItem(`${KEY_EXPIRED}_${id}`);

const setExpiredTime = (idUserCurrent) => {
	localStorage.setItem(
		`${KEY_EXPIRED}_${idUserCurrent}`,
		JSON.stringify({
			expired_time: getTimeExpired(),
		})
	);
};
