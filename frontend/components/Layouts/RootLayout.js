import { useRecipeContext } from '@context/recipe-context';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Header from './Header';
import Loader from '@components/UI/Loader';

function RootLayout({ children }) {
	const { loading, loadingRecipes } = useRecipeContext();
	return (
		<>
			<Header />
			<div className="max-lg:py-40 max-lg:pb-8">
				{children}
			</div>
			<Footer />
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 1500,
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
