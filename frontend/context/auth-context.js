import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@services/axios';
import { clearCookie, getAccessToken, setCookie } from '@utils/cookies';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		tokenAuthen();
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await api.post('/user/login/', {
				email,
				password,
			});
			const { refresh, access } = response.data.token;
			remember && setCookie(access, refresh);
			const profile = await getProfileUser(access);
			setUser(profile.data);
			router.push(`/user/${profile.data.username}`);
		} catch (error) {
			if (error.response.status === 400) {
				setErrors({
					login: { ...error.response.data },
				});
			} else {
				console.log('ERROR IN LOGIN', error);
			}
		}
	};

	const getProfileUser = (accessToken) => {
		return api.get('/user/profile/', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	};

	const tokenAuthen = async () => {
		setLoading(true);
		const access = getAccessToken();
		try {
			const profile = await getProfileUser(access);
			setUser(profile.data);
		} catch (error) {
			console.log('ERROR AT LOAD USER PROFILE', error);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		//appi lgout errror
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
		} catch (error) {
			const status = error.response.status;
			if (status === 400) {
				setErrors({ register: { ...error.response.data } });
			} else {
				console.log('ERROR IN SIGNUP', error.response.statusText);
			}
		}
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
