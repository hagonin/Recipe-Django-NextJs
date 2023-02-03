import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	return (
		<AuthContext.Provider values={[loading, error, user]}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuthContext = () => {
	return useContext(AuthContext);
};
