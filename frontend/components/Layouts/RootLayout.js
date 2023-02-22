import Footer from './Footer';
import Header from './Header';

function RootLayout({ children }) {
	console.log('root render');
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default RootLayout;
