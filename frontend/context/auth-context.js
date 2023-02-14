import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// getProfileUser();
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await axios.post('/api/login', {
				email,
				password,
				remember,
			});
			const {
				success,
				user: { tokenAccess },
			} = response.data;
			if (success && tokenAccess) {
				const profile = await axios.post('/api/profile/', {
					tokenAccess,
				});
				const {
					data: { success, data: userProfile },
				} = profile;
				if (success) {
					setUser(userProfile);
					router.push(`/user/${userProfile.username}`);
				}
			}
		} catch (error) {
			console.log('error at login', error);
			const status = error.response.status;
			if (status === 500) {
				setErrors({ server: 'server is not response' });
			} else {
				setErrors({
					login: error.response.data.error,
				});
			}
		}
	};

	const getProfileUser = async () => {
		try {
			setLoading(true);
			const profile = await axios.post('/api/profile/');
			const {
				data: { success, data: userProfile },
			} = profile;
			if (success) {
				setUser(userProfile);
			}
		} catch (error) {
			console.log('load user error:', error.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		axios
			.post('/api/logout/')
			.then((res) => {
				if (res.data.success) {
					setUser(null);
					router.push('/login');
				}
			})
			.catch((err) => {
				console.log('logout err', err);
			});
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
			const res = await axios.post('/api/signup/', {
				username,
				lastname,
				firstname,
				password,
				confirm_password,
				email,
			});

			if (res.data.success) {
				router.push('/login');
			}
		} catch (error) {
			const status = error.response.status;
			if (status === 500) {
				setErrors({ server: 'server is not response' });
			} else {
				setErrors({
					register: error.response.data.error,
				});
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
