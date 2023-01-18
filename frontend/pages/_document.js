import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<title>HomeCook</title>
				<meta
					name="description"
					content="HomeCook brings recipes from around the world right at home!"
				/>
				<link
					rel="icon"
					href="/static/images/logo_icon.png"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
