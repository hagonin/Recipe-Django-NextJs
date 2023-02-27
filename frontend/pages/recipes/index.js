import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Button from '@components/UI/Button';
import api from '@services/axios';
import Link from 'next/link';
import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from 'react-icons/hi';

function Recipe({ recipes }) {
	return (
		<div className="container my-14">
			<div className="grid grid-cols-3 gap-x-6 gap-y-10">
				{recipes.map((recipe) => (
					<RecipeCard
						{...recipe}
						smallCard={true}
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
	const res = await api.get('/recipe/recipe/');
	const recipes = res?.data?.results?.map(
		({ title: name, image_url: image, updated_at: date, id }) => ({
			name,
			image,
			date,
			id,
		})
	);
	return {
		props: { recipes: recipes || [] },
	};
};
