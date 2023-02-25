import { categories } from '@utils/constants';
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
				className={`max-h-[40vh] overflow-y-scroll overflow-x-hidden ${
					openCategory ? 'block' : 'hidden'
				}`}
			>
				<NavItem
					href="/recipes"
					isSubItem
				>
					All Recipes
				</NavItem>
				{categories.map((category) => (
					<NavItem
						key={category.id}
						href={`/recipes/category/${category.name}`}
						isSubItem
					>
						{category.name}
					</NavItem>
				))}
			</div>
		</>
	);
}

export default memo(NavCategory);
