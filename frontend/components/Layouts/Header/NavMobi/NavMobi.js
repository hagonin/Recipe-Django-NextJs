import { useState } from 'react';

import { NavLinks } from '@utils/constants';

import { FaAngleRight } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import NavItem from './NavItem';
import SocialLink from '@components/UI/SocialLink';

function NavMobi() {
	const [showNavMobi, setShowNavMobi] = useState(false);
	const toggleNavMobi = () => {
		setShowNavMobi(!showNavMobi);
	};
	return (
		<div className="lg:hidden">
			{!showNavMobi && (
				<button
					className="cursor-pointer"
					onClick={toggleNavMobi}
				>
					<HiMenu className="text-3xl" />
				</button>
			)}
			{showNavMobi && (
				<div className="fixed inset-0">
					<div className="absolute w-full h-full bg-[rgba(0,0,0,0.06)]"></div>
					<nav className="absolute h-full  w-2/3 py-12 pl-5 bg-white overflow-y-auto overflow-x-hidden">
						<button
							className="absolute top-2 right-2 text-4xl"
							onClick={toggleNavMobi}
						>
							<MdClose />
						</button>
						{/* user area login*/}
						{/* <div className="">
							<div className="relative h-20 w-20 border border-border rounded-full ml-5">
								<Image
									src="/static/images/user.png"
									alt="avatar"
									priority={true}
									fill
									styles={{
										objectFit: 'contain',
										backgroundColor: 'blue',
									}}
									sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
								/>
							</div>
							<span className="text-black font-bold block mt-3 ml-5">
								User Name
							</span>
							<span className="text-sm text-second block mb-10 ml-5">
								username@gmail.com
							</span>
							<NavItem href="/"> Manage Recipe</NavItem>
							<NavItem>Add Recipe</NavItem>
						</div> */}

						{/* Incognito */}
						<NavItem href="/">
							<span>
								<FiLogIn className="inline-block relative -mt-1 mr-2" />
								Login
							</span>
						</NavItem>
						{/* navigate */}
						<div className="border-y py-2 my-2">
							{NavLinks.map((nav) =>
								nav.children ? (
									<div key={nav.id}>
										<NavItem>
											{nav.name}
											<FaAngleRight className="inline-block ml-2" />
										</NavItem>
										{nav.children.map((child) => (
											<NavItem
												href={child.href}
												isSubItem
											>
												{child.name}
											</NavItem>
										))}
									</div>
								) : (
									<NavItem href={nav.href}>
										{nav.name}
									</NavItem>
								)
							)}
						</div>
						{/* login */}
						{/* <NavItem>
							<span>
								<FiLogOut className="inline-block relative -mt-1 mr-2" />
								Log out
							</span>
						</NavItem> */}
						<div className="md:hidden block">
							<SocialLink
								color="black"
								hover="text-primary"
								top="20"
							/>
						</div>
					</nav>
				</div>
			)}
		</div>
	);
}

export default NavMobi;
