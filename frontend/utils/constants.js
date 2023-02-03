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
