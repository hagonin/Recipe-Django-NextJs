import { Nunito, Open_Sans } from '@next/font/google';
export const nunito = Nunito({
	subsets: ['latin'],
	display: 'optional',
});

export const open_sans = Open_Sans({
	weight: ['400', '500', '600'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--open-sans',
});
