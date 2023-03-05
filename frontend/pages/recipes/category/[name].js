import api from '@services/axios';
import {
	categories,
	ENDPOINT_RECIPE,
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_READ,
} from '@utils/constants';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import { useAuthContext } from '@context/auth-context';
import Img from '@components/UI/Image';
import { useRecipeContext } from '@context/recipe-context';

function CategoryPage({ category }) {
	console.log(category);
	const { handleToggleBookmark, checkBookmarkAct } = useRecipeContext();
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
						id={recipe.id}
						name={recipe.title}
						slug={recipe.slug}
						image={recipe.image_url}
						date={recipe.updated_at}
						rating={recipe.rating}
						bookmark={recipe.total_number_of_bookmarks}
						reviews_count={recipe.reviews_count}
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
	const res = await api.get(ENDPOINT_RECIPE_READ, {
		params: {
			category: name,
		},
	});
	// const recipes = res?.data?.results.map((item) => ({
	// 	id: item.id,
	// 	name: item.title,
	// 	slug: item.slug,
	// 	image: item.image_url,
	// 	date: item.updated_at,
	// 	rating: item.rating,
	// 	bookmark: item.total_number_of_bookmarks,
	// 	reviews_count: item.reviews_count,
	// }));
	return {
		props: {
			category: {
				...infoCategory,
				recipes: res?.data?.results,
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
