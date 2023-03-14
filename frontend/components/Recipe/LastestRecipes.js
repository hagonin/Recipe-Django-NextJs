import RecipeCard from '@components/Recipe/RecipeCard';
import Loader from '@components/UI/Loader';
import useQuery from 'hook/useQuery';

function LastPost({ isFooter, number = 3 }) {
	const { data } = useQuery(number, { ordering: 'created_at' });

	return (
		<div
			className={`${
				isFooter
					? 'grid md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 gap-2'
					: 'flex flex-col gap-4 w-full'
			}`}
		>
			{data ? (
				data.map((item, index) => (
					<RecipeCard
						key={item.id}
						slug={item.slug}
						main_image={item.main_image}
						name={item.title}
						// reviews_count={item.reviews_count}
						date={item.created_at || item.updated_at}
						lastPost
						noBorder={index === 0}
					/>
				))
			) : (
				<>
					<Loader type="recipe-small-card" />
					<Loader type="recipe-small-card" />
				</>
			)}
		</div>
	);
}

export default LastPost;
