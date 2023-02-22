import Cookies from 'js-cookie';

const ACCESS = 'access';
const REFRESH = 'refresh';
const A_DAY = 1;
const A_MONTH = 30;

export const setCookie = (accessVal, refreshVal) => {
	accessVal && Cookies.set(ACCESS, accessVal, { expires: A_DAY, path: '/' });
	refreshVal &&
		Cookies.set(REFRESH, refreshVal, { expires: A_MONTH, path: '/' });
};

export const clearCookie = () => {
	Cookies.remove(ACCESS);
	Cookies.remove(REFRESH);
};

export const getAccessTokenFromCookie = () => {
	return Cookies.get(ACCESS);
};

export const getRefreshTokenFromCookie = () => {
	return Cookies.get(REFRESH);
};
