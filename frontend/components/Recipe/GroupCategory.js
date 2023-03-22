import Link from 'next/link';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { useRecipeContext } from '@context/recipe-context';

import RecipeCard from './RecipeCard';

function GroupCategory({ list = [], name = 'Category name', hasBorder, isFirst }) {
	const { handleToggleBookmark, checkBookmarkAct } = useRecipeContext();
	return (
		<div className={`border-border pb-10 ${isFirst ? 'pt-3' :'pt-7'} ${hasBorder ? 'border-t' : ''}`}>
			<div className="flex justify-between items-center mb-5">
				<h2 className="capitalize text-4xl font-serif text-black">
					{name}
				</h2>
				<Link
					href={`recipes/category/${name}`}
					className="md:text-lg text-[0.85rem] text-black transition-all flex items-center whitespace-nowrap gap-2 hover:text-primary"
				>
					View more
					<AiOutlineDoubleRight />
				</Link>
			</div>
			<div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-x-6 lg:gap-y-10 md:gap-x-4 md:gap-y-8  gap-x-2 gap-y-2">
				{list.map((item) => (
					<RecipeCard
						actBookmark={checkBookmarkAct(item.id)}
						handleToggleBookmark={handleToggleBookmark}
						key={item.slug}
						slug={item.slug}
						date={item.updated_at}
						name={item.title}
						rating={item.rating}
						summary={item.description}
						reviews_count={item.reviews_count}
						main_image={item.main_image}
						id={item.id}
						smallCard
					/>
				))}
			</div>
		</div>
	);
}

export default GroupCategory;
