import AuthProvider from '@context/auth-context';
import RootLayout from '@layouts/RootLayout';
import { open_sans, libre_baskerville } from '@utils/fonts';
import { images } from '@utils/constants';
import Head from 'next/head';
import '@styles/globals.css';
import RecipeProvider from '@context/recipe-context';

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
					href={images.logoIcon}
				/>
			</Head>
			<main
				className={`${open_sans.variable} ${libre_baskerville.variable} font-sans`}
			>
				<AuthProvider>
					<RecipeProvider>
						<RootLayout>
							{render(<Component {...pageProps} />)}
						</RootLayout>
					</RecipeProvider>
				</AuthProvider>
			</main>
		</>
	);
}

export default MyApp;
