import { useRecipeContext } from '@context/recipe-context';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Header from './Header';
import Loader from '@components/UI/Loader';
import { useRouter } from 'next/router';

function RootLayout({ children }) {
	const { loading, loadingRecipes } = useRecipeContext();
	const { pathname } = useRouter();

	return (
		<>
			{pathname === '/login' || pathname === '/signup' || pathname === '/404' ? (
				children
			) : (
				<>
					<Header />
					<div className="max-lg:py-28 max-lg:pb-8">{children}</div>
					<Footer />
				</>
			)}

			<Toaster
				position="top-right"
				reverseOrder={false}
				toastOptions={{
					duration: 2200,
				}}
			/>

			{loading || loadingRecipes ? (
				<div className="fixed inset-0 bg-[rgba(255,255,255,0.8)] z-[999] flex">
					<Loader type="handle" />
				</div>
			) : null}
		</>
	);
}

export default RootLayout;
