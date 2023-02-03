import { useAuthContext } from '@context/auth-context';
import Login from '@page/login';

function withAuth(Component) {
	const Auth = (props) => {
		const [isAuth, loading] = useAuthContext();
		if (isAuth) {
			return <Component {...props} />;
		} else {
			return <Login />;
		}
	};
	return Auth;
}

export default withAuth;
