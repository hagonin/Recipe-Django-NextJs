import api from '@services/axios';
import {
	categories,
	ENDPOINT_RECIPE,
	ENDPOINT_RECIPE_READ,
} from '@utils/constants';

import GroupCategory from '@components/Recipe/GroupCategory';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/UI/Slider';
import Slide from '@components/UI/Slider/Slide';
import SubscribeSection from '@components/SubcribeSection';

export default function Home({ categories }) {
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
			<SubscribeSection />
			<WidgetLayout>
				{categories.map(
					(category) =>
						category.data.length > 0 && (
							<GroupCategory
								key={category.id}
								list={category.data}
								name={category.name}
							/>
						)
				)}
			</WidgetLayout>
		</>
	);
}

export const getStaticProps = async () => {
	const requests = categories.map(({ name }) =>
		api.get(`${ENDPOINT_RECIPE_READ}`, {
			params: {
				category: name,
			},
		})
	);
	const res = await Promise.all(requests).then((res) => res);
	const results = categories.map(({ name }, index) => ({
		name: name,
		data: res[index].data?.results,
	}));
	return {
		props: {
			categories: results,
		},
		revalidate: 360,
	};
};
