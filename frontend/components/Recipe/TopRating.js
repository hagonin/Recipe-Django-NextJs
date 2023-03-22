import Loader from '@components/UI/Loader';
import RecipeCard from './RecipeCard';

function TopRating({ recipes }) {
	return recipes ? (
		<>
			<h3 className=" font-serif">Discover Top Rate</h3>
			<div className="flex flex-col md:gap-y-4 gap-y-2 md:w-1/2">
				{recipes.map((item, index) => (
					<RecipeCard
						key={item.id}
						slug={item.slug}
						main_image={item.main_image}
						name={item.title}
						rating={item.rating}
						reviews_count={item.reviews_count}
						date={item.created_at || item.updated_at}
						lastestRecipe
						firstPost={index === 0}
					/>
				))}
			</div>
		</>
	) : (
		<div className="w-1/2">
			<h3 className=" font-serif mb-6">Discover Top Rate</h3>
			<Loader type="recipe-small-card" />
		</div>
	);
}

export default TopRating;
