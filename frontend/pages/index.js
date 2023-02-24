import api from '@services/axios';
import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import SubscribeSection from '@components/SubcribeSection';

export default function Home({ recipes }) {
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
	console.log(recipes);

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
			<SubscribeSection />
			<WidgetLayout>
				<GroupCategory
					list={recipes}
					name="seafood"
				/>
			</WidgetLayout>
		</>
	);
}

export const getStaticProps = async () => {
	let recipes = [];
	await api
		.get('/recipe/recipe/')
		.then((res) => {
			recipes = res.data.results.map((item) => {
				const { slug, image_url, created_at } = item;
				return {
					id: 1,
					name: slug,
					image: image_url,
					date: created_at,
				};
			});
		})
		.catch((error) => console.log('ERROR AT home', error));

	return {
		props: {
			recipes,
		},
	};
};
