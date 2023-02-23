import { images } from '@utils/constants';
import { getRefreshTokenFromCookie, setCookie } from '@utils/cookies';
import { getFormAvatarFromUrl } from '@utils/getformavatar';
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
	(res) => {
		const { data } = res;
		return Promise.resolve(data);
	},
	async (error) => {
		const { status, data: _error } = error?.response;
		const _config = error.config;

		// set default avatar
		if (_config.url === '/user/profile/avatar/' && status === 500) {
			try {
				const avatarForm = await getFormAvatarFromUrl(
					images.defaultAvatar,
					'avatar_default'
				);
				await api.put('/user/profile/avatar/', avatarForm, {
					headers: {
						Authorization: _config.headers.Authorization,
						'Content-type': 'multipart/form-data',
					},
				});
				return api(_config);
			} catch (error) {
				return Promise.reject({
					status: 500,
					errors: 'Can not set deault avatar',
				});
			}
		} else {
			return Promise.reject({ status, _error });
		}
	}
);
export default api;
