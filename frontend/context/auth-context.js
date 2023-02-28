import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import api from '@services/axios';
import {
	clearCookie,
	getAccessTokenFromCookie,
	getRefreshTokenFromCookie,
	setCookie,
} from '@utils/cookies';
import { images } from '@utils/constants';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState({
		access: getAccessTokenFromCookie(),
		refresh: getRefreshTokenFromCookie(),
	});
	const router = useRouter();

	useEffect(() => {
		const resInterceptor = (res) => res;
		const errInterceptor = async ({ status, _error, _config }) => {
			if (status === 401 && !_config._retry) {
				_config._retry = true;
				try {
					const refreshRes = await api.post('/user/token/refresh/', {
						refresh: token.refresh,
					});
					const { refresh, access } = refreshRes.data;
					setToken({ access: access, refresh: refresh });
					setCookie(access, refresh);
					_config.headers = {
						Authorization: `Bearer ${access}`,
					};
					return api(_config);
				} catch (error) {
					return Promise.reject(error);
				}
			}

			return Promise.reject({ status, _error });
		};

		const interceptor = api.interceptors.response.use(
			resInterceptor,
			errInterceptor
		);
		tokenAuthen();
		return api.interceptors.response.eject(interceptor);
	}, []);

	const tokenAuthen = async () => {
		if (token.access || token.refresh) {
			try {
				const profile = await getProfile();
				const { user, ...rest } = profile.data;
				const avatar = await getAvatar();
				const { image_url } = avatar.data;

				setUser({ ...user, ...rest, avatar: image_url });
			} catch (error) {
				console.log('ERROR AT TOKEN AUTHENTICATION', error);
			} finally {
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await api.post(
				'/user/logout/',
				{
					refresh: token.refresh,
				},
				{
					headers: {
						Authorization: `Bearer ${token.access}`,
					},
				}
			);
			setUser(null);
			clearCookie();
			setToken({ access: null, refresh: null });
			router.push('/login');
		} catch ({ status, _error }) {
			console.log('ERROR IN LOGOUT', status, _error);
		} finally {
			setLoading(false);
		}
	};

	const login = async ({ email, password, remember }) => {
		setLoading(true);
		try {
			const loginRes = await api.post('/user/login/', {
				email,
				password,
			});
			const { refresh, access } = loginRes.data.tokens;
			setToken({ access: access, refresh: refresh });
			remember && setCookie(access, refresh);

			const profile = await getProfile(access);
			const { user, ...rest } = profile.data;

			const avatar = await getAvatar(access);
			const { image_url } = avatar.data;
			setUser({ ...user, ...rest, avatar: image_url });
			router.push('/');
		} catch ({ status, _error }) {
			if (status === 400) {
				setErrors({ login: { ..._error } });
			} else if (status === 401) {
				_error.detail !== 'Email is not verified' &&
					toast.error(_error.detail);
				_error.detail === 'Email is not verified' &&
					setErrors({
						login: {
							verify_expired: true,
						},
					});
			} else {
				console.log('error in login', status, _error);
			}
		} finally {
			setLoading(false);
		}
	};

	const signup = async ({
		username,
		firstname,
		lastname,
		password,
		confirm_password,
		email,
	}) => {
		try {
			await api.post('/user/register/', {
				username,
				lastname,
				firstname,
				password,
				confirm_password,
				email,
			});
			router.push('/login');
			toast.success('Account successfully created.');
		} catch ({ status, _error }) {
			const { errors } = _error;
			if (status === 400) {
				if (errors?.error) {
					setErrors({
						register: { confirm_password: errors?.error },
					});
				} else {
					setErrors({ register: { ...errors } });
				}
			} else {
				console.log('ERROR IN SIGNUP', status, _error);
			}
		}
	};

	const updateProfile = async (data) => {
		const {
			personal: { username, last_name, first_name },
			bio,
			avatar: formAvatar,
		} = data;
		try {
			await api.patch(
				'/user/',
				{ username, last_name, first_name },
				{
					headers: {
						Authorization: `Bearer ${token.access}`,
					},
				}
			);
			const profileRes = await api.patch(
				'/user/profile/',
				{
					bio,
				},
				{
					headers: {
						Authorization: `Bearer ${token.access}`,
					},
				}
			);
			const { user, ...rest } = profileRes.data;

			const avatarRes = await setAvatar(formAvatar);
			const { image_url: avatar } = avatarRes.data;

			setUser({ avatar, ...user, ...rest });
			router.push('/user/profile/');
		} catch ({ status, _error }) {
			if (status === 400) {
				setErrors({ account: { ..._error } });
			} else {
				console.log(status, _error);
			}
		}
	};

	const setAvatar = (formAvatar, access) => {
		const tokenAccess =
			access || token.access || getAccessTokenFromCookie();
		return api.patch('/user/profile/avatar/', formAvatar, {
			headers: {
				Authorization: `Bearer ${tokenAccess}`,
				'Content-type': 'multipart/form-data',
			},
		});
	};

	const getAvatar = (access) => {
		const tokenAccess =
			access || token.access || getAccessTokenFromCookie();

		return api.get('/user/profile/avatar/', {
			headers: {
				Authorization: `Bearer ${tokenAccess}`,
			},
		});
	};

	const getProfile = (access = token.access) => {
		return api.get('/user/profile/', {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
	};

	const fetcher = async (url) =>
		await api
			.get(url, {
				headers: {
					Authorization: `Bearer ${token.access}`,
				},
			})
			.then((res) => res?.data?.results || res?.data);

	return (
		<AuthContext.Provider
			value={{
				errors,
				setErrors,
				user,
				isAuthenticated: !!user,
				login,
				signup,
				logout,
				loading,
				updateProfile,
				token,
				fetcher,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
