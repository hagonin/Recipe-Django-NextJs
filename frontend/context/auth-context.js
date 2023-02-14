import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import api from '@services/axios';

const AuthContext = createContext();

const tokenFake = new Promise((resolve) => {
	setTimeout(() => {
		resolve('success');
	}, 4000);
});

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		tokenAuthentication();
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await axios.post('/api/login', {
				email,
				password,
				remember,
			});
			const { success, user } = response.data;
			if (success) {
				success && setUser(user);
				router.push(`/user/${user.username}`);
			}
		} catch (error) {
			setErrors({
				login: error.response.data.error,
			});
		}
	};

	// not received enough user information
	const tokenAuthentication = async () => {
		// try {
		// 	const response = await axios.get('/api/user');
		// 	setUser(response.data.data);
		// 	setIsAuthenticated(true);
		// } catch (error) {
		// 	console.log('load user error:', error);
		// 	setIsAuthenticated(false);
		// } finally {
		// 	setLoading(false);
		// }
		await tokenFake;
		setLoading(false);
		setUser({
			username: 'Mike',
		});
	};

	const logout = () => {
		axios
			.post('/api/logout/')
			.then((res) => {
				if (res.data.success) {
					setUser(null);
					setIsAuthenticated(false);
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
			setErrors({ register: error.response.data });
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
