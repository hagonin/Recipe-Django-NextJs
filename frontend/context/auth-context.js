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
		} catch ({ status, _error }) {
			console.log('ERROR IN LOGOUT', status, _error);
		} finally {
			setLoading(false);
		}
	};

	const login = async ({ email, password, remember }) => {
		setLoading(true);
		try {
			const loginRes = await api.post(ENDPOINT_LOGIN, {
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
				if (_error.detail === 'Email is not verified') {
					setErrors({
						login: {
							verify_expired: true,
						},
					});
				} else {
					toast.error(_error.detail);
				}
			} else {
				console.log('error in login', status, _error);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleResendVerify = ({ email }) =>
		api
			.post(ENDPOINT_RESEND_VERIFY, {
				email,
			})
			.then(() => {
				setErrors(null);
				toast.success(
					'We have sent the new verify email. Please check your email.'
				);
			})
			.catch();
	const signup = async ({
		username,
		firstname,
		lastname,
		password,
		confirm_password,
		email,
	}) => {
		try {
			await api.post(ENDPOINT_REGISTER, {
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
				ENDPOINT_USER,
				{ username, last_name, first_name },
				configAuth()
			);
			const profileRes = await api.patch(
				ENDPOINT_USER_PROFILE,
				{
					bio,
				},
				configAuth()
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

	const setAvatar = (
		formAvatar,
		access = token.access || getAccessTokenFromCookie()
	) => api.patch(ENDPOINT_USER_AVATAR, formAvatar, configAuth(access));

	const getAvatar = (access = token.access || getAccessTokenFromCookie()) =>
		api.get(ENDPOINT_USER_AVATAR, configAuth(access));

	const getProfile = (access = token.access) =>
		api.get(ENDPOINT_USER_PROFILE, configAuth(access));

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
				isAuthenticated: !!user,
				login,
				signup,
				logout,
				loading,
				updateProfile,
				token,
				handleResendVerify,
				configAuth,
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
