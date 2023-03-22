import { useEffect, useState } from 'react';
import Link from 'next/link';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { categoryList } from '@utils/constants';
import { lato } from '@utils/fonts';

function Navigate() {
	const [isHover, setIsHover] = useState(false);
	const [stick, setStick] = useState({});

	const stickNav = (e) => {
		if (window.scrollY > 256) {
			setStick({
				box1: 'fixed top-search-bar left-0 w-full shadow-sm',
				box2: 'border-none',
			});
		} else {
			setStick(null);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', stickNav);
	}, []);

	return (
		<nav className={`bg-white  max-lg:hidden z-[333] ${stick?.box1}`}>
			<div
				className={`container flex justify-center items-center border-y ${stick?.box2}`}
			>
				<NavItem
					href="/"
					label="Home"
				/>
				<div
					className={`font-medium text-blackLight uppercase py-4 cursor-pointer relative group `}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<NavItem
						label="Categories"
						className="group-hover:text-primary"
						icon={<MdOutlineKeyboardArrowDown />}
					/>

					{isHover && (
						<div className="top-full left-0 bg-white  absolute z-10 w-[550px] shadow-md border-t-2 border-primary grid grid-cols-2 p-2">
							<NavItem
								href="/recipes"
								label="All Recipes "
								className=" 
									block py-2 px-5  border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
							/>
							{categoryList.map((category) => (
								<NavItem
									key={category.id}
									href={`/recipes/category/${category.name}`}
									label={category.name}
									className="
									 block py-2 px-5  border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)]"
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

const NavItem = ({ href, label, className, icon }) => {
	const Comp = href ? Link : 'button';
	return (
		<Comp
			href={href}
			className={`${lato.className} tracking-widest flex items-center gap-2 font-semibold text-base uppercase px-5  hover:text-primaryDark ${className}`}
		>
			{label}
			{icon && <span className="text-3xl">{icon}</span>}
		</Comp>
	);
};

export default Navigate;
