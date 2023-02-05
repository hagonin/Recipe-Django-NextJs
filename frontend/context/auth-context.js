import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import api from '@services/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsAuthenticated(!!user);
	}, [user]);

	useEffect(() => {
		loadUser();
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await axios.post('/api/login', {
				email,
				password,
				remember,
			});
			const { success, user } = response.data;
			success && setUser(response.data.user);
			if (success) {
				setUser(user);
				router.push(`/user/${user.username}`);
			}
		} catch (error) {
			setErrors(error.response.data.error);
		}
	};

	const loadUser = () => {
		axios
			.get('/api/user')
			.then((res) => console.log(res))
			.catch((err) => {
				console.log(err);
			});
	};

	const logout = async () => {
		try {
			const res = await axios.post('/api/logout/');
			if (res.data.success) {
				setUser(null);
				router.push('/login');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const signup = async ({
		username,
		firstname,
		lastname,
		password,
		email,
	}) => {
		try {
			await api.post('/user/register/', {
				username,
				lastname,
				firstname,
				password,
				email,
			});

			router.push('/login');
		} catch (error) {
			setErrors(error.response.data);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				errors,
				setErrors,
				user,
				isAuthenticated,
				login,
				signup,
				logout,
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
