import { Fragment, useState } from 'react';

import { useAuthContext } from '@context/auth-context';

import { images, NavLinks } from '@utils/constants';

import { HiMenu } from 'react-icons/hi';
import {
	MdClose,
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import NavItem from './NavItem';
import SocialLink from '@components/UI/SocialLink';
import Img from '@components/UI/Image';
import { Transition } from '@headlessui/react';
import { useRecipeContext } from '@context/recipe-content';

function NavMobi() {
	const { isAuthenticated, user, logout } = useAuthContext();
	const { categories } = useRecipeContext();
	const [showNavMobi, setShowNavMobi] = useState(false);
	const toggleNavMobi = () => {
		setShowNavMobi(!showNavMobi);
	};

	const [openCategory, setOpenCategory] = useState(false);
	const toggleCategory = () => setOpenCategory(!openCategory);
	return (
		<div className="lg:hidden">
			<button
				className="cursor-pointer"
				onClick={toggleNavMobi}
			>
				<HiMenu className="text-3xl" />
			</button>
			<Transition.Root show={showNavMobi}>
				<Transition.Child
					as={Fragment}
					enter="transition duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave=" transition"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.15)]"
						onClick={toggleNavMobi}
					></div>
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transform transition duration-500"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0 "
					leave="transform transition duration-500"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<nav className="fixed top-0 left-0 bottom-0 z-20  w-2/3 py-12 pl-5 bg-white overflow-y-auto overflow-x-hidden">
						<button
							className="absolute top-2 right-2 text-4xl"
							onClick={toggleNavMobi}
						>
							<MdClose />
						</button>
						{isAuthenticated ? (
							<div>
								<Img
									src={user?.avatar || images.defaultAvatar}
									alt="avatar"
									className="h-20 w-20 border-border rounded-full ml-5 overflow-hidden"
									cover
								/>
								<span className="text-black font-bold block mt-3 ml-5">
									{user?.username}
								</span>
								<span className="text-sm text-second block mb-10 ml-5">
									{user?.email}
								</span>
								<NavItem href={`/user/profile/`}>
									Profile
								</NavItem>
								<NavItem href={`/user/updateprofile/`}>
									Update Profile
								</NavItem>
								<NavItem href="/recipes/addnewrecipe">
									Add Recipe
								</NavItem>
							</div>
						) : (
							<NavItem href="/login">
								<span>
									<FiLogIn className="inline-block relative -mt-1 mr-2" />
									Login
								</span>
							</NavItem>
						)}

						<div className="border-y py-2 mt-2 mb-5">
							{NavLinks.map((nav) =>
								nav.children ? (
									<div key={nav.id}>
										<NavItem onClick={toggleCategory}>
											{nav.name}
											{openCategory ? (
												<MdOutlineKeyboardArrowUp className="text-2xl inline-block ml-2" />
											) : (
												<MdOutlineKeyboardArrowDown className="text-2xl inline-block ml-2" />
											)}
										</NavItem>

										<div
											className={`overflow-hidden transition-all duration-300 ${
												openCategory
													? 'h-[156px]'
													: 'h-0'
											}`}
										>
											{nav.children.map((child) => (
												<NavItem
													key={child.id}
													href={`${nav.href}${child.href}`}
													isSubItem
												>
													{child.name}
												</NavItem>
											))}
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
									</div>
								) : (
									<NavItem
										href={nav.href}
										key={nav.id}
									>
										{nav.name}
									</NavItem>
								)
							)}
						</div>
						{isAuthenticated && (
							<NavItem onClick={logout}>
								<span>
									<FiLogOut className="inline-block relative -mt-1 mr-2" />
									Log out
								</span>
							</NavItem>
						)}
						<div className="md:hidden block mt-6">
							<SocialLink color="black" />
						</div>
					</nav>
				</Transition.Child>
			</Transition.Root>
		</div>
	);
}

export default NavMobi;
