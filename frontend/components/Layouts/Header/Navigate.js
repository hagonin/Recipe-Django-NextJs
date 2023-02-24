import { useState } from 'react';
import Link from 'next/link';
import { FaAngleDown } from 'react-icons/fa';
import { NavLinks } from '@utils/constants';
import { useRecipeContext } from '@context/recipe-content';

function Navigate() {
	const [isHover, setIsHover] = useState(false);
	const { categories } = useRecipeContext();
	return (
		<nav className="bg-white  max-lg:hidden">
			<div className="container flex justify-center items-center border-y">
				{NavLinks.map((nav) =>
					nav.children ? (
						<div
							key={nav.id}
							className={`text-sm text-blackLight uppercase font-bold py-4 px-5  cursor-pointer relative group `}
							onMouseEnter={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
						>
							<span className="group-hover:text-primary">
								{nav.name}
							</span>
							<FaAngleDown className="inline-block ml-2 group-hover:text-primary" />
							{isHover && (
								<div className="min-w-[200px] top-full  right-0 bg-white  absolute z-10 left-5 shadow-md border-t-2 border-primary">
									{nav.children.map((child) => (
										<Link
											key={child.id}
											href={`${nav.href}${child.href}`}
											className="block font-semibold py-3 px-5 hover:text-primary border-b border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
										>
											{child.name}
										</Link>
									))}
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
					) : (
						<Link
							key={nav.id}
							href={nav.href}
							className="text-sm text-blackLight uppercase font-bold px-5 py-5 hover:text-primary"
						>
							{nav.name}
						</Link>
					)
				)}
			</div>
		</nav>
	);
}

export default Navigate;
