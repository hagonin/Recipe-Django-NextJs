import {
	Lato,
	Libre_Baskerville,
	Montserrat,
	Noto_Sans_Display,
	Nunito,
	Nunito_Sans,
	Open_Sans,
} from '@next/font/google';

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

export const nunito_sans = Nunito_Sans({
	weight: ['400', '700', '900'],
	style: ['normal'],
	subsets: ['latin'],
	variable: 'nunito-sans',
	fallback: ['system-ui', 'arial'],
});

export const nunito = Nunito({
	weight: ['400', '500', '600'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--nunito',
	fallback: ['system-ui', 'arial'],
});

export const lato = Lato({
	weight: ['300'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--lato',
	fallback: ['system-ui', 'arial'],
});

export const noto_sans_display = Noto_Sans_Display({
	weight: ['400', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--noto_sans_display',
	fallback: ['system-ui', 'arial'],
});
