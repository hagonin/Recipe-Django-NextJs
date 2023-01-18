import RootLayout from '../components/Layouts/RootLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const render = Component.getLayout || ((pages) => pages);
	return <RootLayout>{render(<Component {...pageProps} />)}</RootLayout>;
}

export default MyApp;
