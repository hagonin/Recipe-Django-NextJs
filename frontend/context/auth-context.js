import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuth, setIsAuth] = useState(false);

	const login = () => {};
	const logout = () => {};
	const signup = () => {};

	return (
		<AuthContext.Provider value={[loading, error, user, isAuth]}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default AuthProvider;
