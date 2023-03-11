import RecipeCard from '@components/Recipe/RecipeCard';
import Loader from '@components/UI/Loader';
import useQuery from 'hook/useQuery';

function LastPost({ isFooter, number = 3 }) {
	const { data } = useQuery(number, { ordering: 'created_at' });

	return (
		<div
			className={`${
				isFooter
					? 'grid grid-cols-2 lg:gap-6 md:gap-4 gap-2'
					: 'flex flex-col gap-4 w-full'
			}`}
		>
			{data ? (
				data.map((item) => (
					<RecipeCard
						key={item.id}
						slug={item.slug}
						main_image={item.main_image}
						name={item.title}
						date={item.created_at || item.updated_at}
						lastPost
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
