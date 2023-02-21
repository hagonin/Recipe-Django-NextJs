import Cookies from 'js-cookie';

const ACCESS = 'access';
const REFRESH = 'refresh';

export const setCookie = (accessVal, refreshVal) => {
	accessVal && Cookies.set(ACCESS, accessVal, { expires: 1, path: '/' });
	refreshVal && Cookies.set(REFRESH, refreshVal, { expires: 30, path: '/' });
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
