import { useAuthContext } from '@context/auth-context';
import Link from 'next/link';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import RecipeCard from './RecipeCard';

function GroupCategory({ list = [], name = 'Category name' }) {
	const { handleToggleBookmark, checkBookmarkAct } = useAuthContext();
	return (
		<div className="border-b border-border py-8">
			<div className="flex justify-between items-center mb-5">
				<h2 className="capitalize">{name}</h2>
				<Link
					href={`recipes/category/${name}`}
					className="flex items-center gap-2 hover:text-primary"
				>
					View more
					<AiOutlineDoubleRight />
				</Link>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-x-6 lg:gap-y-10 md:gap-x-4 md:gap-y-8 gap-8">
				{list.map((item) => (
					<RecipeCard
						actBookmark={checkBookmarkAct(item.id)}
						handleToggleBookmark={handleToggleBookmark}
						key={item.slug}
						slug={item.slug}
						date={item.updated_at}
						name={item.title}
						image={item.image_url}
						cook_time={item.cook_time}
						prep_time={item.prep_time}
						className="grid gap-4"
						id={item.id}
					/>
				))}
			</div>
		</div>
	);
}

export default GroupCategory;
