export const EXPIRED_TIMER = 5 * 60 * 60;
export const KEY_EXPIRED = 'HOMECOOK_KEY_EXPIRED';
export const STATUS_EXPIRED = 429;

export const getTimeExpired = () => {
	const expired_date = getCurrentTime() + EXPIRED_TIMER;
	return expired_date;
};

export const getCurrentTime = () => {
	const time = new Date();
	return time.getTime() / 1000;
};

export const handleExpired = () => {
	!localStorage.getItem(KEY_EXPIRED) &&
		localStorage.setItem(KEY_EXPIRED, getTimeExpired());
};
