import RootLayout from '@layouts/RootLayout';
import '@styles/globals.css';
import { nunito } from '@utils/fonts';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	const render = Component.getLayout || ((pages) => pages);
	return (
		<>
			<Head>
				<title>HomeCook</title>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<meta
					name="description"
					content="HomeCook brings recipes from around the world right at home!"
				/>

				<link
					rel="icon"
					href="/static/images/logo_icon.png"
				/>
			</Head>
			<main className={nunito.className}>
				<RootLayout>{render(<Component {...pageProps} />)}</RootLayout>
			</main>
		</>
	);
}

export default MyApp;
