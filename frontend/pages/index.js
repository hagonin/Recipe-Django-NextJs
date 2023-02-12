import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import SubScribe from '@components/Subscribe';
import Slide from '@components/UI/Slider/Slide';

export default function Home() {
	const recipes = [
		{
			id: 1,
			name: 'Banana and Blueberry Cereal',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
			date: 'January 12, 2021',
		},
		{
			id: 2,
			name: 'Banana and Blueberry Cereal',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
			date: 'January 12, 2021',
		},
		{
			id: 3,
			name: 'Banana and Blueberry Cereal',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
			date: 'January 12, 2021',
		},
	];
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
					<Slide
						{...recipe}
						key={recipe.id}
					/>
				))}
			</Slider>
			<SubScribe />
			<WidgetLayout>
				<GroupCategory
					list={recipes}
					name="breakfast"
				/>
			</WidgetLayout>
		</>
	);
}
