import { EB_Garamond, Nunito, Open_Sans } from '@next/font/google';
export const nunito = Nunito({
	subsets: ['latin'],
	display: 'optional',
});

export const open_sans = Open_Sans({
	weight: ['400', '500', '600', '700', '800'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--open-sans',
});

export const garamond = EB_Garamond({
	weight: ['500'],
	style: ['italic'],
	subsets: ['latin'],
});
