import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';

import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';

import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import NavItem from './NavItem';
import SocialLink from '@components/UI/SocialLink';
import Img from '@components/UI/Image';
import NavCategory from './NavCategory';
import Logo from '../Logo';

function NavMobi() {
	const router = useRouter();
	const { isAuthenticated, user, logout } = useAuthContext();
	const [showNavMobi, setShowNavMobi] = useState(false);
	const toggleNavMobi = () => {
		setShowNavMobi(!showNavMobi);
	};

	useEffect(() => {
		setShowNavMobi(false);
	}, [router]);

	return (
		<>
			<div className="bg-white max-lg:shadow-sm   lg:h-logo-bar-pc h-logo-bar-mobile lg:mt-search-bar max-lg:fixed top-search-bar left-0 w-full max-lg:z-[333]">
				<div className="container flex lg:justify-center justify-between h-full">
					<Logo className="mx-auto " />
					<button
						className="cursor-pointer lg:hidden"
						onClick={toggleNavMobi}
					>
						<AiOutlineMenu className="text-[2rem]" />
					</button>
				</div>
			</div>

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
						className="fixed inset-0 z-[555] bg-[rgba(0,0,0,0.3)]"
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
					<nav className="fixed top-0 left-0 bottom-0 z-[666]  py-10  bg-white overflow-y-auto overflow-x-hidden scrollbar shadow-lg min-w-[250px]">
						<button
							className="absolute top-[10px] right-3 text-[1.4rem]"
							onClick={toggleNavMobi}
						>
							<GrClose />
						</button>
						{isAuthenticated && (
							<div className="flex gap-4 items-center mb-5 mt-3">
								<Img
									src={user?.avatar || images.defaultAvatar}
									alt="avatar"
									className="h-16 w-16 border-border rounded-full ml-5 overflow-hidden"
									cover
								/>
								<div className="pr-5">
									<span className="md:text-2xl text-xl text-black font-bold block">
										{user?.username}
									</span>
									<span className="text-second block ">
										{user?.email}
									</span>
								</div>
							</div>
						)}

						<div className="border-y py-2 mt-2 mb-2">
							<NavItem href="/">Home</NavItem>
							<NavCategory />
							<NavItem href="/about">About</NavItem>
							<NavItem href="/contact">Contact</NavItem>
						</div>

						{isAuthenticated ? (
							<>
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
								<NavItem href={`/user/profile/`}>
									Wishlist
								</NavItem>
							</>
						) : (
							<>
								<NavItem href="/login">
									<span className=" text-xl ">
										<FiLogIn className="inline-block relative -mt-1 mr-2" />
										Login
									</span>
								</NavItem>
								<NavItem href="/signup">
									<span className=" text-xl ">
										<FiUserPlus className="text-xl inline-block relative -mt-1 mr-2" />
										Signup
									</span>
								</NavItem>
							</>
						)}

						{isAuthenticated && (
							<NavItem onClick={logout}>
								<span className="text-xl">
									<FiLogOut className="inline-block relative -mt-1 mr-2" />
									Log out
								</span>
							</NavItem>
						)}
						<div className="md:hidden block mt-6 flex justify-center w-full">
							<SocialLink color="grey" />
						</div>
					</nav>
				</Transition.Child>
			</Transition.Root>
		</>
	);
}

export default NavMobi;
