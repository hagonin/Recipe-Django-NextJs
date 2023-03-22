import axios from 'axios';

const A_MINUTE = 60000;
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
	},
	timeout: A_MINUTE,
});

api.interceptors.request.use(
	(req) => req,
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const status = error?.response?.status;
		const _error = error?.response?.data;
		const _config = error?.config;
		return Promise.reject({ status, _error, _config, error });
	}
);
export default api;
