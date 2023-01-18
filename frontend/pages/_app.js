import RootLayout from '../components/Layouts/RootLayout';
import '../styles/globals.css';
import { nunito } from '../utils/fonts';

function MyApp({ Component, pageProps }) {
	const render = Component.getLayout || ((pages) => pages);
	return (
		<main className={nunito.className}>
			<RootLayout>{render(<Component {...pageProps} />)}</RootLayout>
		</main>
	);
}

export default MyApp;
