import { Libre_Baskerville, Open_Sans } from '@next/font/google';

export const open_sans = Open_Sans({
	weight: ['400', '500', '600', '700', '800'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--open-sans',
	fallback: ['system-ui', 'arial'],
});

export const libre_baskerville = Libre_Baskerville({
	weight: ['400', '700'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--libre-baskerville',
	fallback: ['system-ui', 'arial'],
});
