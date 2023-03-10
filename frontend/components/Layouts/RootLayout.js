import Footer from './Footer';
import Header from './Header';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '@context/auth-context';
import Loader from '@components/UI/Loader';
import { useRecipeContext } from '@context/recipe-context';

function RootLayout({ children }) {
	const { loading, loadingRecipes } = useRecipeContext();
	const { loading: loadAuth } = useAuthContext();
	return (
		<>
			<Header />
			{children}
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={1500}
				transition={Slide}
			/>
			{loading || loadingRecipes || loadAuth ? (
				<div className="fixed inset-0 bg-[rgba(255,255,255,0.7)] flex">
					<Loader type="handle" />
				</div>
			) : null}
		</>
	);
}

export default RootLayout;
