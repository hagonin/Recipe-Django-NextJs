import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Image from 'next/image';
import Link from 'next/link';

function Category({cover, name, desc, recipes}) {
	return (
		<>
			<div className="relative border-b border-border pb-5">
				<Image
					src={cover}
					alt={name}
					fill
					className="!relative"
				/>
				<h1 className="mt-6">{name}</h1>
				<p className="mt-3">{desc}</p>
			</div>
			{recipes.map((recipe) => (
				<RecipeCard {...recipe} />
			))}
		</>
	);
}

export default Category;

Category.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
