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
};

export const NavLinks = [
	{
		id: 1,
		name: 'Home',
		href: '/',
	},
	{
		id: 2,
		name: 'Recipe Category',
		href: '/recipes',
		children: [
			{
				id: 0,
				name: 'All Recipes',
				href: '/',
			},
			{
				id: 1,
				name: 'Breakfast',
				href: '/category/breakfast',
			},
			{
				id: 2,
				name: 'Lunch',
				href: '/category/lunch',
			},
			{
				id: 3,
				name: 'Dinner',
				href: '/category/dinner',
			},
		],
	},
	{
		id: 3,
		name: 'About',
		href: '/about',
	},
	{
		id: 4,
		name: 'Contact',
		href: '/contact',
	},
];
