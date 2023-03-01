import WidgetLayout from '@components/Layouts/WidgetLayout';
import Category from '@components/Recipe/Category';
import api from '@services/axios';
import { categories, ENDPOINT_RECIPE_DETAIL } from '@utils/constants';

function CategoryPage({ category }) {
	return <Category {...category} />;
}

export default CategoryPage;

CategoryPage.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

export const getStaticProps = async ({ params }) => {
	const { name } = params;
	const infoCategory = categories.filter((item) => item.name === name)[0];
	const res = await api.get(ENDPOINT_RECIPE_DETAIL, {
		params: {
			category: name,
		},
	});
	const recipes = res?.data?.results.map(
		({
			title: name,
			slug,
			image_url: image,
			prep_time,
			cook_time,
			description: summary,
			updated_at: date,
		}) => ({
			name,
			slug,
			image,
			prep_time,
			cook_time,
			summary,
			date,
		})
	);
	return {
		props: {
			category: {
				...infoCategory,
				recipes: recipes,
			},
		},
	};
};

export const getStaticPaths = () => {
	const paths = categories.map((item) => ({ params: { name: item.name } }));
	return {
		paths,
		fallback: 'blocking',
	};
};
