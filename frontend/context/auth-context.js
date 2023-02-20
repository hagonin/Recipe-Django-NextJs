import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@services/axios';
import {
	clearCookie,
	getAccessToken,
	getRefreshToken,
	setCookie,
} from '@utils/cookies';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const [isNewer, setIsNewer] = useState(false);

	useEffect(() => {
		tokenAuthen(getAccessToken());
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await api.post('/user/login/', {
				email,
				password,
			});
			const { refresh, access } = response.data.token;
			console.log(access);
			remember && setCookie(access, refresh);
			const user = await api.get('/user/', {
				headers: {
					Authorization: `Bearer ${access}`,
				},
			});
			handleSetUserFromResponse(user);
			if (isNewer) {
				router.push('/user/updateprofile/');
			} else {
				await tokenAuthen(access);
				router.push('/');
			}
		} catch (error) {
			if (error.response?.status === 400) {
				setErrors({
					login: { ...error.response.data },
				});
			} else {
				console.log('ERROR IN LOGIN', error);
			}
		}
	};

	const tokenAuthen = async (token) => {
		setLoading(true);
		try {
			const profile = await api.get('/user/profile/', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			handleSetUserFromResponse(profile);
		} catch (error) {
			console.log('ERROR AT LOAD USER PROFILE', error);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			const res = await api.patch(
				'/user/logout/',
				{
					refresh: getRefreshToken(),
				},
				{
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				}
			);
		} catch (error) {
			console.log('ERROR AT LOGOUT', error);
		}
		clearCookie();
		setUser(null);
		router.push('/login');
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
			setIsNewer(true);
		} catch (error) {
			const status = error.response.status;
			if (status === 400) {
				setErrors({ register: { ...error.response.data } });
			} else {
				console.log('ERROR IN SIGNUP', error.response.statusText);
			}
		}
	};

	const updateProfile = async (data) => {
		const { personal, profile } = data;
		try {
			await api.patch(
				'/user/',
				{ ...personal },
				{
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				}
			);
			const profileRes = await api.patch('/user/profile/', profile, {
				headers: {
					Authorization: `Bearer ${getAccessToken()}`,
					'Content-type': 'multipart/form-data',
				},
			});
			handleSetUserFromResponse(profileRes);
			router.push('/user/profile/');
		} catch (error) {
			console.log('ERR IN UPDATE PROFILE', error);
		}
	};

	const handleSetUserFromResponse = (res) => {
		const { user, image_url: avatar, ...rest } = res.data;
		setUser({ avatar, ...user, ...rest });
	};

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
