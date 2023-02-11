import Category from '@components/Recipe/Category';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import SubScribe from '@components/Subscribe';
import Slide from '@components/UI/Slider/Slide';

export default function Home() {
	const category = {
		name: 'Breakfast',
		desc: 'Cras id consequat sem. Suspendisse efficitur pellentesque nulla, et placerat arcu pulvinar volutpat. Nunc cursus libero nec ipsum lacinia pellentesque. Integer placerat scelerisque neque. Donec commodo ligula viverra augue convallis, vitae feugiat nibh fringilla. Donec pulvinar odio rhoncus, pretium est et, volutpat lacus.',
		cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/breakfast_tax_2.jpg',
		recipes: [
			{
				id: 1,
				name: 'Banana and Blueberry Cereal',
				image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
				date: 'January 12, 2021',
				summary:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur metus aliquam lacus bibendum, non sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam.',
			},
			{
				id: 2,
				name: 'Banana and Blueberry Cereal',
				image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
				date: 'January 12, 2021',
				summary:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur metus aliquam lacus bibendum, non sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam.',
			},
			{
				id: 3,
				name: 'Banana and Blueberry Cereal',
				image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
				date: 'January 12, 2021',
				summary:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur metus aliquam lacus bibendum, non sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam',
			},
		],
	};
	const recipesRandom = [
		{
			id: 1,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 2,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		},
		{
			id: 3,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		},
		{
			id: 4,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 5,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 6,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
	];
	return (
		<>
			<Slider>
				{recipesRandom.map((recipe) => (
					<Slide {...recipe} />
				))}
			</Slider>
			<SubScribe />
			<WidgetLayout>
				<Category {...category} />
			</WidgetLayout>
		</>
	);
}
