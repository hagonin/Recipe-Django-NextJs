import Footer from './Footer';
import Header from './Header';

function RootLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default RootLayout;
