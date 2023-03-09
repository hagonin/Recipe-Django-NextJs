import { useState } from 'react';
import Link from 'next/link';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { categoryList } from '@utils/constants';

function Navigate() {
	const [isHover, setIsHover] = useState(false);
	return (
		<nav className="bg-white  max-lg:hidden">
			<div className="container flex justify-center items-center border-y">
				<NavItem
					href="/"
					label="Home"
				/>
				<div
					className={`font-medium text-blackLight uppercase py-4 px-5  cursor-pointer relative group `}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<NavItem
						label="Categories"
						className="group-hover:text-primary"
					/>

					<MdOutlineKeyboardArrowDown className="relative -top-[1px] text-2xl inline-block ml-2 group-hover:text-primary" />
					{isHover && (
						<div className="top-full left-0 bg-white  absolute z-10 w-[500px] shadow-md border-t-2 border-primary grid grid-cols-3 p-2">
							<NavItem
								href="/recipes"
								label="All Recipes "
								className="!text-base 
									!font-medium block py-2 px-5  border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
							/>
							{categoryList.map((category) => (
								<NavItem
									key={category.id}
									href={`/recipes/category/${category.name}`}
									label={category.name}
									className="
									!font-medium !text-base block py-2 px-5  border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
								/>
							))}
						</div>
					)}
				</div>
				<NavItem
					href="/about"
					label="About"
				/>
				<NavItem
					href="/contact"
					label="Contact"
				/>
			</div>
		</nav>
	);
}

const NavItem = ({ href, label, className }) => {
	const Comp = href ? Link : 'span';
	return (
		<Comp
			href={href}
			className={`font-semibold text-lg uppercase px-5  hover:text-primaryDark ${className}`}
		>
			{label}
		</Comp>
	);
};

export default Navigate;
