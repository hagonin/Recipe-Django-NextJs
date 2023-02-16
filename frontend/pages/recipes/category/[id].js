import WidgetLayout from '@components/Layouts/WidgetLayout';
import Category from '@components/Recipe/Category';


function CategoryPage() {
	const category = {
		name: 'Breakfast',
		desc: 'Cras id consequat sem. Suspendisse efficitur pellentesque nulla, et placerat arcu pulvinar volutpat. Nunc cursus libero nec ipsum lacinia pellentesque. Integer placerat scelerisque neque. Donec commodo ligula viverra augue convallis, vitae feugiat nibh fringilla. Donec pulvinar odio rhoncus, pretium est et, volutpat lacus.',
		cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/breakfast_tax_2.jpg',
		recipes: [
			{
				id: 1,
				name: 'Banana and Blueberry Cereal',
				prep_time: '30 minutes',
				cook_time: '30 minutes',
				image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
				date: 'January 12, 2021',
				summary:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur metus aliquam lacus bibendum, non sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam.',
			},
			{
				id: 2,
				name: 'Banana and Blueberry Cereal',
				prep_time: '30 minutes',
				cook_time: '30 minutes',
				image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
				date: 'January 12, 2021',
				summary:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur metus aliquam lacus bibendum, non sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam.',
			},
			{
				id: 3,
				name: 'Banana and Blueberry Cereal Banana and Blueberry Cereal Banana and Blueberry Cereal',
				prep_time: '30 minutes',
				cook_time: '30 minutes',
				image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
				date: 'January 12, 2021',
				summary:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consectetur metus aliquam lacus bibendum, non sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam. Nunc sed euismod dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem, eget eleifend quam',
			},
		],
	};
	return <Category {...category} />;
}

export default CategoryPage;

CategoryPage.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
