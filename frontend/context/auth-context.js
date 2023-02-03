import api from '@services/axios';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);

	const login = (email, password) => {
		return api.post('/user/login/', {
			email,
			password,
		});
	};

	const logout = () => {};
	const signup = () => {};

	return (
		<AuthContext.Provider value={{ loading, error, user, isAuth, login }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
