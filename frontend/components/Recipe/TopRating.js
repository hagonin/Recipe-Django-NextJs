import useQuery from 'hook/useQuery';
import RecipeCard from './RecipeCard';

function TopRating({recipes}) {
	
	return (
		recipes && (
			<>
				{' '}
				<h3 className="mb-6">Discover top rating</h3>
				<div className="flex flex-col gap-y-6">
					{recipes.map((item) => (
						<RecipeCard
							key={item.id}
							slug={item.slug}
							main_image={item.main_image}
							name={item.title}
							rating={item.rating}
							reviews_count={item.reviews_count}
							date={item.created_at || item.updated_at}
							lastPost
						/>
					))}
				</div>
			</>
		)
	);
}

export default TopRating;
