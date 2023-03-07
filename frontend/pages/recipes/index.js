import api from '@services/axios';
import { ENDPOINT_RECIPE } from '@utils/constants';

import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from 'react-icons/hi';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import { useRecipeContext } from '@context/recipe-context';

function Recipe() {
	const { checkBookmarkAct, handleToggleBookmark, recipes } =
		useRecipeContext();

	return (
		<div className="container my-14">
			<div className="grid grid-cols-3 gap-x-6 gap-y-10">
				{recipes &&
					recipes.map((item) => {
						return (
							<RecipeCard
								key={item.id}
								id={item.id}
								slug={item.slug}
								date={item.updated_at}
								name={item.title}
								rating={item.rating}
								image={item.image_url}
								cook_time={item.cook_time}
								prep_time={item.prep_time}
								category={item.category}
								actBookmark={checkBookmarkAct(item.id)}
								handleToggleBookmark={handleToggleBookmark}
								smallCard
							/>
						);
					})}
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
