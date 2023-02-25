import { useState } from 'react';
import Link from 'next/link';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { categories } from '@utils/constants';

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
						<div className="min-w-[200px] top-full  right-0 bg-white  absolute z-10 left-5 shadow-md border-t-2 border-primary max-h-[30vh] overflow-y-scroll">
							<Link
								href="/recipes"
								className="block font-semibold py-3 px-5 hover:text-primary border-b border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
							>
								All Recipes
							</Link>
							{categories.map((category) => (
								<Link
									key={category.id}
									href={`/recipes/category/${category.name}`}
									className="block font-semibold py-3 px-5 hover:text-primary border-b border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
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
