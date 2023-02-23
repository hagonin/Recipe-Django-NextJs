import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import SubscribeForm from '@components/Form/SubscribeForm';
import api from '@services/axios';

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
			<section className="container bg-grey py-4 px-5 flex md:items-center justify-between max-md:flex-col mt-4">
				<div>
					Don't miss a single recipe!
					<br />
					<span className="text-sm">
						Subscribe to receive new recipes straight to your inbox!
					</span>
				</div>
				<SubscribeForm />
			</section>
			<WidgetLayout>
				<GroupCategory
					list={recipes}
					name="seafood"
				/>
			</WidgetLayout>
		</>
	);
}

export const getStaticProps = () => {
	let recipes = [];
	api.get('/recipe/recipe/')
		.then((res) => {
			recipes = res.data.map((item) => {
				const imageDefault = item.images.filter((img) => img.default)[0]
					.image_url;
				return {
					id: item.id,
					name: item.title,
					image: imageDefault,
					date: item.created_at,
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
