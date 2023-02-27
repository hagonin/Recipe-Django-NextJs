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
				position="top-left"
				autoClose={1500}
				transition={Slide}
			/>
		</>
	);
}

export default RootLayout;
