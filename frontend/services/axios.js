import { getRefreshToken, setCookie } from '@utils/cookies';
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
	},
	timeout: 10000,
});

api.interceptors.request.use(
	(req) => req,
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalConfig = error.config;
		if (error.response?.status === 401 && !originalConfig._retry) {
			originalConfig._retry = true;
			try {
				const resp = await api.post('/user/token/refresh/', {
					refresh: getRefreshToken(),
				});
				const { refresh, access } = resp.data;
				setCookie(access, refresh);
				originalConfig.headers = {
					Authorization: `Bearer ${access}`,
				};
				return api(originalConfig);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
