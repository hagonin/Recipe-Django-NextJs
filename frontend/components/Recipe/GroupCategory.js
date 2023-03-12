import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import Link from 'next/link';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import RecipeCard from './RecipeCard';

function GroupCategory({ list = [], name = 'Category name' }) {
	const { handleToggleBookmark, checkBookmarkAct } = useRecipeContext();
	return (
		<div className="border-b border-border py-8">
			<div className="flex justify-between items-center mb-5">
				<h2 className="capitalize text-4xl font-serif text-black">
					{name}
				</h2>
				<Link
					href={`recipes/category/${name}`}
					className="text-lg text-black transition-all flex items-center gap-2 hover:text-primary"
				>
					View more
					<AiOutlineDoubleRight />
				</Link>
			</div>
			<div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-x-6 lg:gap-y-10 md:gap-x-4 md:gap-y-8  gap-x-2 gap-y-10">
				{list.map((item) => (
					<RecipeCard
						actBookmark={checkBookmarkAct(item.id)}
						handleToggleBookmark={handleToggleBookmark}
						key={item.slug}
						slug={item.slug}
						date={item.updated_at}
						name={item.title}
						rating={item.rating}
						reviews_count={item.reviews_count}
						main_image={item.main_image}
						id={item.id}
						smallCard
						isAverage
					/>
				))}
			</div>
		</div>
	);
}

export default GroupCategory;
