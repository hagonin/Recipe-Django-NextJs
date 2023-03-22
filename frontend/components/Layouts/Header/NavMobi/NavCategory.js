import Link from 'next/link';
import { memo, useState } from 'react';
import {
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { categoryList } from '@utils/constants';
import NavItem from './NavItem';

function NavCategory() {
	const [openCategory, setOpenCategory] = useState(false);
	const toggleCategory = () => setOpenCategory(!openCategory);
	return (
		<>
			<NavItem onClick={toggleCategory}>
				Categories
				{openCategory ? (
					<MdOutlineKeyboardArrowUp className="text-3xl inline-block ml-2 relative top-[2px]" />
				) : (
					<MdOutlineKeyboardArrowDown className="text-3xl inline-block ml-2 relative top-[2px]" />
				)}
			</NavItem>
			<div
				className={`grid md:grid-cols-2  bg-[rgba(0,0,0,0.06)] pl-2  ${
					openCategory ? 'block' : 'hidden'
				}`}
			>
				<Link
					href="/recipes"
					className="block capitalize py-2 px-3 hover:text-primary text-left "
				>
					All Recipes
				</Link>
				{categoryList.map((category) => (
					<Link
						key={category.id}
						href={`/recipes/category/${category.name}`}
						className="block capitalize py-2 px-3 hover:text-primary text-left"
					>
						{category.name}
					</Link>
				))}
			</div>
		</>
	);
}

export default memo(NavCategory);
