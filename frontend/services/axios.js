import axios from 'axios';
import cookie from 'cookie';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: 3000,
});

api.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		// refresh token
		if (error.response?.status === 401) {
			const request = error.request;
			console.log(request);
		}
		return Promise.reject(error);
	}
);

export default api;
