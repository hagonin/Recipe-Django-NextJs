import { getRefreshTokenFromCookie, setCookie } from '@utils/cookies';
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

export default api;
