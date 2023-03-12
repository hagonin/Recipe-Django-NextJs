import { Fragment, useState } from 'react';

import { useAuthContext } from '@context/auth-context';

import { images } from '@utils/constants';

import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import NavItem from './NavItem';
import SocialLink from '@components/UI/SocialLink';
import Img from '@components/UI/Image';
import { Transition } from '@headlessui/react';
import NavCategory from './NavCategory';
import { BsMenuApp, BsMenuButton } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

function NavMobi() {
	const { isAuthenticated, user, logout } = useAuthContext();
	const [showNavMobi, setShowNavMobi] = useState(false);
	const toggleNavMobi = () => {
		setShowNavMobi(!showNavMobi);
	};

	return (
		<div className="lg:hidden ">
			<button
				className="cursor-pointer"
				onClick={toggleNavMobi}
			>
				<AiOutlineMenu className="text-[2rem]" />
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
					<nav className="fixed top-0 left-0 bottom-0 z-20  w-2/3 py-12 pl-5 bg-white overflow-y-auto overflow-x-hidden scrollbar shadow-lg">
						<button
							className="absolute top-3 right-3 text-[2rem]"
							onClick={toggleNavMobi}
						>
							<GrClose />
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
								<NavItem href={`/user/changepassword`}>
									Change Password
								</NavItem>
								<NavItem href="/user/recipe/add">
									Add Recipe
								</NavItem>
							</div>
						) : (
							<NavItem href="/login">
								<span>
									<FiLogIn className="text-xl inline-block relative -mt-1 mr-2" />
									Login
								</span>
							</NavItem>
						)}

						<div className="border-y py-2 mt-2 mb-5">
							<NavItem href="/">Home</NavItem>
							<NavCategory />
							<NavItem href="/about">About</NavItem>
							<NavItem href="/contact">Contact</NavItem>
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
