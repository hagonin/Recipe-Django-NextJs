import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@services/axios';
import {
	clearCookie,
	getAccessTokenFromCookie,
	getRefreshTokenFromCookie,
	setCookie,
} from '@utils/cookies';
import { toast } from 'react-toastify';
import {
	ENDPOINT_LOGIN,
	ENDPOINT_LOGOUT,
	ENDPOINT_REFRESH_TOKEN,
	ENDPOINT_REGISTER,
	ENDPOINT_RESEND_VERIFY,
	ENDPOINT_USER,
	ENDPOINT_USER_AVATAR,
	ENDPOINT_USER_PROFILE,
} from '@utils/constants';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState({});
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
					const refreshRes = await api.post(ENDPOINT_REFRESH_TOKEN, {
						refresh: token.refresh,
					});
					const { refresh, access } = refreshRes.data;
					setToken({ access: access, refresh: refresh });
					setCookie(access, refresh);
					_config.headers = configAuth(access).headers;
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
				const user = await getUser();
				const {
					profile: { avatar, ..._profile },
					...rest
				} = user.data;

				setUser({ avatar, ..._profile, ...rest });
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
				ENDPOINT_LOGOUT,
				{
					refresh: token.refresh,
				},
				configAuth()
			);
			setUser(null);
			clearCookie();
			setToken({ access: null, refresh: null });
			router.push('/login');
		} catch {
		} finally {
			setLoading(false);
		}
	};

	const login = async ({ email, password, remember }) => {
		try {
			const loginRes = await api.post(ENDPOINT_LOGIN, {
				email,
				password,
			});
			const { refresh, access } = loginRes.data.tokens;
			setToken({ access: access, refresh: refresh });
			remember && setCookie(access, refresh);

			const user = await getUser(access);
			const {
				profile: { image_url: avatar, ..._profile },
				...rest
			} = user.data;

			setUser({ avatar, ..._profile, ...rest });
			router.push('/');
		} catch ({ status, _error }) {
			if (status === 400) {
				setErrors({ login: { ..._error } });
			} else if (status === 401) {
				if (_error.detail === 'Email is not verified') {
					setErrors({
						login: {
							verify_expired: true,
						},
					});
				} else {
					toast.error(_error.detail);
				}
			}
		}
	};

	const handleResendVerify = ({ email }) =>
		api
			.post(ENDPOINT_RESEND_VERIFY, {
				email,
			})
			.then((res) => {
				setErrors(null);
				if (res.data.msg === 'No such user, register first') {
					toast.error('Resend failed!');
					return 400;
				} else {
					toast.success('We have sent the new verify email.');
				}
			})
			.catch();

	const signup = async (data) => {
		try {
			await api.post(ENDPOINT_REGISTER, data);
			setUser((pre) => ({ ...pre, email: data.email }));
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

	const updateProfile = async ({ personal, formProfile }) => {
		try {
			await api.patch(ENDPOINT_USER_PROFILE, formProfile, configAuth());
			const res = await api.patch(ENDPOINT_USER, personal, configAuth());
			const {
				profile: { image_url: avatar, ..._profile },
				...rest
			} = res.data;
			setUser({ avatar, ..._profile, ...rest });
			router.push('/user/profile/');
		} catch ({ status, _error }) {
			if (status === 400) {
				setErrors({ account: { ..._error } });
			}
		}
	};

	const getUser = (access = token.access) =>
		api.get(ENDPOINT_USER, configAuth(access));

	const configAuth = (access = token.access) => ({
		headers: {
			Authorization: `Bearer ${access}`,
			'Content-type': 'multipart/form-data',
		},
	});

	return (
		<AuthContext.Provider
			value={{
				errors,
				setErrors,
				user,
				setUser,
				isAuthenticated: !!user?.username,
				login,
				signup,
				logout,
				loading,
				setLoading,
				updateProfile,
				token,
				handleResendVerify,
				configAuth,
				// handleToggleBookmark,
				// checkBookmarkAct,
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
