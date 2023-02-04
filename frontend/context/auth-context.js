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

	const login = async ({ email, password, remember }) => {
		return api
			.post(
				'/user/login/',
				{
					email,
					password,
				},
				{
					credentials: 'include',
				}
			)
			.then((res) => {
				const {
					username,
					email,
					token: { access },
				} = res.data;
				setUser({ username, email });
				remember && setCookie(access);
				router.push(`/user/${username}`);
			})
			.catch((error) => {
				setErrors(error.response.data);
			});
	};

	const setCookie = (accessToken) => {
		axios
			.post('/api/cookies', {
				token: accessToken,
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const logout = () => {};
	const signup = () => {};

	return (
		<AuthContext.Provider
			value={{ errors, setErrors, user, isAuthenticated, login }}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
