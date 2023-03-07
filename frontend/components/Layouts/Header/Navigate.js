import { useState } from 'react';
import Link from 'next/link';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { categoryList } from '@utils/constants';

function Navigate() {
	const [isHover, setIsHover] = useState(false);
	return (
		<nav className="bg-white  max-lg:hidden">
			<div className="container flex justify-center items-center border-y">
				<Link
					href={'/'}
					className="text-sm text-blackLight uppercase font-bold px-5 py-5 hover:text-primary"
				>
					Home
				</Link>
				<div
					className={`text-sm text-blackLight uppercase font-bold py-4 px-5  cursor-pointer relative group `}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<span className="group-hover:text-primary">Categories</span>

					<MdOutlineKeyboardArrowDown className="relative -top-[1px] text-2xl inline-block ml-2 group-hover:text-primary" />
					{isHover && (
						<div className="top-full left-0 bg-white  absolute z-10 w-[500px] shadow-md border-t-2 border-primary grid grid-cols-3 p-2">
							<Link
								href="/recipes"
								className="block font-semibold py-3 px-5 hover:text-primary hover:underline border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
							>
								All Recipes
							</Link>
							{categoryList.map((category) => (
								<Link
									key={category.id}
									href={`/recipes/category/${category.name}`}
									className="block font-semibold py-3 px-5  hover:text-primary  hover:underline  border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
								>
									{category.name}
								</Link>
							))}
						</div>
					)}
				</div>
				<Link
					href={'/about'}
					className="text-sm text-blackLight uppercase font-bold px-5 py-5 hover:text-primary"
				>
					About
				</Link>
				<Link
					href={'/contact'}
					className="text-sm text-blackLight uppercase font-bold px-5 py-5 hover:text-primary"
				>
					Contact
				</Link>
			</div>
		</nav>
	);
}

export default Navigate;
