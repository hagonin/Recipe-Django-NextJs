import Loader from '@components/UI/Loader';
import { useAuthContext } from '@context/auth-context';
import { useRouter } from 'next/router';

function PrivateRoutes({ children }) {
	const router = useRouter();
	const { isAuthenticated, user } = useAuthContext();
	const isBrowser = typeof window !== 'undefined';

	// router.push only works on browser
	if (isBrowser && !isAuthenticated) {
		router.push('/login');
	}

	if (!isAuthenticated) {
		return (
			<div className="container py-14">
				<Loader type="skeleton" />
			</div>
		);
	}

	return children;
}

export default PrivateRoutes;
