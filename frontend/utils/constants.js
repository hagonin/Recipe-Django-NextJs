export const NavLinks = [
	{
		id: 1,
		name: 'Home',
		href: '/',
	},
	{
		id: 2,
		name: 'Recipe Category',
		href: '/categories',
		children: [
			{
				id: 1,
				name: 'Breakfast',
				href: 'breakfast',
			},
			{
				id: 2,
				name: 'Lunch',
				href: 'lunch',
			},
			{
				id: 3,
				name: 'Dinner',
				href: 'dinner',
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
