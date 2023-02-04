import { createContext, useContext, useEffect, useState } from 'react';
import api from '@services/axios';
import { useRouter } from 'next/router';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	const login = ({ email, password, remember }) => {
		return api
			.post('/user/login/', {
				email,
				password,
			})
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

	useEffect(() => {
		setIsAuthenticated(!!user);
	}, [user]);

	const setCookie = (accessToken) => {
		console.log(accessToken);
	};

	const logout = () => {};
	const signup = () => {};

	return (
		<AuthContext.Provider value={{ errors, user, isAuthenticated, login }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
