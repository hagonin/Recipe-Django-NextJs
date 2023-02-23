import Footer from './Footer';
import Header from './Header';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RootLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
			<ToastContainer
				position="top-center"
				autoClose={3000}
				transition={Slide}
			/>
		</>
	);
}

export default RootLayout;
