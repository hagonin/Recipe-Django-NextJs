import { categoryList } from '@utils/constants';
import Link from 'next/link';
import { memo, useState } from 'react';
import {
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

import NavItem from './NavItem';

function NavCategory() {
	const [openCategory, setOpenCategory] = useState(false);
	const toggleCategory = () => setOpenCategory(!openCategory);
	return (
		<>
			<NavItem onClick={toggleCategory}>
				Categories
				{openCategory ? (
					<MdOutlineKeyboardArrowUp className="text-2xl inline-block ml-2" />
				) : (
					<MdOutlineKeyboardArrowDown className="text-2xl inline-block ml-2" />
				)}
			</NavItem>
			<div
				className={`grid grid-cols-2 ml-16  ${
					openCategory ? 'block' : 'hidden'
				}`}
			>
				<Link
					href="/recipes"
					isSubItem
					className="block font-semibold capitalize py-2 px-3 hover:text-primary hover:underline text-left"
				>
					All Recipes
				</Link>
				{categoryList.map((category) => (
					<Link
						key={category.id}
						href={`/recipes/category/${category.name}`}
						className="block font-semibold capitalize py-2 px-3 hover:text-primary hover:underline text-left"
						isSubItem
					>
						{category.name}
					</Link>
				))}
			</div>
		</>
	);
}

export default memo(NavCategory);
