import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import api from '@services/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		getProfileUser();
	}, []);

	const login = async ({ email, password, remember }) => {
		try {
			const response = await axios.post('/api/login/', {
				email,
				password,
				remember,
			});
			console.log('RES IN LOGIN', response);
			setUser(response.data);
			router.push(`/user/${response.data.username}`);
		} catch (error) {
			if (error.response.status === 400) {
				setErrors({
					login: { ...error.response.data },
				});
			} else {
				console.log('ERROR IN LOGIN', error.response.statusText);
			}
		}
	};

	const getProfileUser = async () => {
		setLoading(true);
		try {
			const profile = await axios.get('/api/profile/');
			setUser(profile.data);
			console.log('RES AT LOAD USER PROFILE', profile);
		} catch (error) {
			console.log(
				'ERROR AT LOAD USER PROFILE',
				error.response.statusText
			);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		console.log('logout...');
		// axios
		// 	.post('/api/logout/')
		// 	.then((res) => {
		// 		if (res.data.success) {
		// 			setUser(null);
		// 			router.push('/login');
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log('logout err', err);
		// 	});
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
			await axios.post('/api/signup/', {
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
