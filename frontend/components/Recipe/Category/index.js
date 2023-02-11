import Link from 'next/link';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import RecipeCard from '../RecipeCard';

function Category({
	list = [
		{
			id: 1,
			name: 'Crispy Croissants and Butter Crispy Croissants and Butter Crispy Croissants and Butter',
			date: 'January 13, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 2,
			name: 'Crispy Croissants and Butter',
			date: 'January 13, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
		},
		{
			id: 3,
			name: 'Crispy Croissants and Butter',
			date: 'January 13, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
		},
		{
			id: 4,
			name: 'Crispy Croissants and Butter',
			date: 'January 13, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
		},
		{
			id: 5,
			name: 'Crispy Croissants and Butter',
			date: 'January 13, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
		},
		{
			id: 6,
			name: 'Crispy Croissants and Butter',
			date: 'January 13, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/22.jpg',
		},
	],
	name = 'breakfast',
}) {
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
					/>
				))}
			</div>
		</div>
	);
}

export default Category;
