export const images = {
	logo: '/static/images/logo.png',
	logoIcon: '/static/images/logo_icon.png',
	login: '/static/images/girl-cooking-1.png',
	signup: '/static/images/girl-cooking-2.png',
	defaultAvatar: '/static/images/user.png',
	icon1: '/static/images/icon1.png',
	icon2: '/static/images/icon1.png',
	addRecipeImg: '/static/images/addrecipe.png',
	recipe1: '/static/images/recipe1.jpg',
	recipe2: '/static/images/recipe2.jpg',
	bio: '/static/images/bio.png',
	resetpassword: '/static/images/reset-password.png',
	resetpassword1: '/static/images/reset-password-1.png',
	recipe_default: '/static/images/recipe_default.png',
	not_verify_email: '/static/images/not_verify_email.png',
	verify_email: '/static/images/verify_email.png',
	photoDefault: '/static/images/photoDefault.png',
	spoon: '/static/images/spoon.jpeg',
};

export const categories = [
	{ id: 1, name: 'Appetizers' },
	{ id: 2, name: 'Bread' },
	{ id: 3, name: 'Breakfast' },
	{ id: 4, name: 'Desserts' },
	{ id: 5, name: 'Vegan' },
	{ id: 6, name: 'Drink' },
	{ id: 7, name: 'Main Dish' },
	{ id: 8, name: 'Salad' },
	{ id: 9, name: 'Soups, Stew, and Chill ' },
	{ id: 10, name: 'Side Dish' },
	{ id: 11, name: 'Marinades and Sauces' },
];

export const unit = [
	{ id: 1, name: 'pounds' },
	{ id: 2, name: 'lbs' },
	{ id: 3, name: 'oz' },
	{ id: 4, name: 'g' },
	{ id: 5, name: 'kg' },
	{ id: 6, name: 'cup' },
	{ id: 7, name: 'teaspoon' },
	{ id: 8, name: 'tablespoon' },
];

// endpoint
export const ENDPOINT_REGISTER = '/user/register';
export const ENDPOINT_LOGOUT = '/user/logout';
export const ENDPOINT_LOGIN = '/user/login';

export const ENDPOINT_USER = '/user/';
export const ENDPOINT_USER_PROFILE = '/user/profile/';
export const ENDPOINT_USER_AVATAR = '/user/profile/avatar';

export const ENDPOINT_REFRESH_TOKEN = '/user/token/refresh'
export const ENDPOINT_EMAIL_VERIFY = '/user/email-verify';
export const ENDPOINT_RESEND_VERIFY = '/user/resend-email-verify';

export const ENDPOINT_REQUEST_RESET_EMAIL = '/user/request-reset-email';
export const ENDPOINT_PASSWORD_RESET_COMPLETE = '/user/password-reset-complete';

export const ENDPOINT_CHANGE_PASSWORD = '/user/change_password';
