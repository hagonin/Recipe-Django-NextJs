import Head from 'next/head';
import AuthProvider from '@context/auth-context';
import RecipeProvider from '@context/recipe-context';
import RootLayout from '@layouts/RootLayout';
import { libre_baskerville, open_sans } from '@utils/fonts';
import { images } from '@utils/constants';
import '@styles/globals.css';

function MyApp({ Component, pageProps }) {
	const render = Component.getLayout || ((pages) => pages);
	
	return (
		<>
			<Head>
				<title>HomeCook | Bringing the taste of home to every meal</title>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta
					name="description"
					content="HomeCook brings recipes from around the world right at home!"
				/>

				<link rel="icon" href={images.logoIcon} />
			</Head>
			<main className={`${libre_baskerville.variable} ${open_sans.className} `}>
				<AuthProvider>
					<RecipeProvider>
						<RootLayout>{render(<Component {...pageProps} />)}</RootLayout>
					</RecipeProvider>
				</AuthProvider>
			</main>
		</>
	);
}

export default MyApp;
