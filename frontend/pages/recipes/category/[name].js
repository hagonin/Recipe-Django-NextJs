import api from '@services/axios';
import { categories, ENDPOINT_RECIPE_DETAIL } from '@utils/constants';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import { useAuthContext } from '@context/auth-context';
import Img from '@components/UI/Image';

function CategoryPage({ category }) {
	const { handleToggleBookmark, checkBookmarkAct } = useAuthContext();
	return (
		<>
			<div className="border-b border-border pb-5">
				<Img
					src={category.cover}
					alt={category.name}
				/>
				<h1 className="mt-6 capitalize">{category.name}</h1>
				<p className="mt-3">{category.desc}</p>
			</div>
			<div className="grid">
				{category.recipes.map((recipe) => (
					<RecipeCard
						key={recipe.id}
						{...recipe}
						handleToggleBookmark={handleToggleBookmark}
						actBookmark={checkBookmarkAct(recipe.id)}
						lgCard
						border
						className="grid lg:grid-cols-12 gap-6 grid-cols-1"
					/>
				))}
			</div>
		</>
	);
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
			id,
			title: name,
			slug,
			image_url: image,
			prep_time,
			cook_time,
			description: summary,
			updated_at: date,
		}) => ({
			id,
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
