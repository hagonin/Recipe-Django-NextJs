import { useRouter } from 'next/router';
import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';

function PrivateRoutes({ children }) {
	const router = useRouter();
	const { isAuthenticated, loading } = useAuthContext();
	const isBrowser = typeof window !== 'undefined';

	// router.push only works on browser
	if (isBrowser && !isAuthenticated && !loading) {
		router.push('/login');
	}

	if (!isAuthenticated) {
		return (
			<div className="container py-14">
				<Loader type="profile" />
			</div>
		);
	}

	return children;
}

export default PrivateRoutes;
