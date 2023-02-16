import Link from 'next/link';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import RecipeCard from './RecipeCard';

function GroupCategory({ list = [], name = 'Category name' }) {
	return (
		<div className="border-b border-border pb-8">
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
						{...item}
						key={item.id}
						className="grid gap-4"
					/>
				))}
			</div>
		</div>
	);
}

export default GroupCategory;
