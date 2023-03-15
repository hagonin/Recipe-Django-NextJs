import { useRecipeContext } from '@context/recipe-context';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Footer';
import Header from './Header';
import Loader from '@components/UI/Loader';

const contextClass = {
	success: 'bg-[#edfce9]',
	error: 'bg-[#ffe6e6]',
};

function RootLayout({ children }) {
	const { loading, loadingRecipes } = useRecipeContext();
	// const { loading: loadAuth } = useAuthContext();
	return (
		<>
			<Header />
			<div className="max-md:mt-[128px] py-1 md:mt-32 lg:mt-0 mt-0">
				{children}
			</div>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={1000}
				transition={Slide}
				toastClassName={({ type }) =>
					contextClass[type] +
					' relative flex px-2 pb-2 rounded-md justify-between overflow-hidden cursor-pointer border'
				}
				bodyClassName={() => 'text-lg text-black flex p-3'}
				icon={false}
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
