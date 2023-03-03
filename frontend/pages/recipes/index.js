import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { ENDPOINT_RECIPE } from '@utils/constants';

import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from 'react-icons/hi';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';

function Recipe({ recipes }) {
	const { checkBookmarkAct, handleToggleBookmark } = useAuthContext();

	return (
		<div className="container my-14">
			<div className="grid grid-cols-3 gap-x-6 gap-y-10">
				{recipes.map((recipe) => (
					<RecipeCard
						key={recipe.id}
						{...recipe}
						smallCard={true}
						actBookmark={checkBookmarkAct(recipe.id)}
						handleToggleBookmark={handleToggleBookmark}
					/>
				))}
			</div>
			<div className="flex justify-between mt-10">
				<Button icon={{ left: <HiOutlineChevronDoubleLeft /> }}>
					Previous Recipe
				</Button>
				<Button icon={{ right: <HiOutlineChevronDoubleRight /> }}>
					Next recipe
				</Button>
			</div>
		</div>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

export const getStaticProps = async () => {
	const res = await api.get(ENDPOINT_RECIPE);
	const recipes = res?.data?.results?.map((item) => ({
		name: item.title,
		image: item.image_url,
		date: item.updated_at,
		id: item.id,
		slug: item.slug,
	}));
	return {
		props: { recipes: recipes},
	};
};
