import useQuery from 'hook/useQuery';
import RecipeCard from '@components/Recipe/RecipeCard';
import Loader from '@components/UI/Loader';

function LastPost({ isFooter, number = 3 }) {
	const { data } = useQuery(number, { ordering: 'created_at' });

	return (
		<div
			className={`${
				isFooter
					? 'grid md:grid-cols-2 grid-cols-1  mt-3'
					: 'flex flex-col w-full'
			} md:gap-4 gap-2`}
		>
			{data ? (
				data.map((item, index) => (
					<RecipeCard
						key={item.id}
						slug={item.slug}
						main_image={item.main_image}
						name={item.title}
						reviews_count={item.reviews_count}
						rating={item.rating}
						date={item.created_at || item.updated_at}
						firstPost={index === 0}
						secondPost={index === 1 && isFooter}
						lastestRecipe
					/>
				))
			) : (
				<>
					<Loader type="recipe-small-card" />
					<Loader type="recipe-small-card" />
					<Loader type="recipe-small-card" />
					<Loader type="recipe-small-card" />
				</>
			)}
		</div>
	);
}

export default LastPost;
