import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import SocialLink from '@components/UI/SocialLink';
import Navigate from './Navigate';
import { useState } from 'react';
import Logo from '@components/UI/Logo';
import NaviMobi from './NavMobi';
import SearchForm from '@components/UI/Form/SearchForm';

function Header() {
	const [showNavMobi, setShowNavMobi] = useState(true);
	const toggleNavMobi = () => {
		setShowNavMobi(!showNavMobi);
	};
	return (
		<header>
			<div className="bg-primary sm:h-10 h-14 text-white">
				<div className="container h-full flex justify-between items-center">
					<SearchForm />
					<div className="sm:block hidden">
						<SocialLink />
					</div>
				</div>
			</div>
			<div className="relative">
				<div className="container flex lg:flex-col items-center justify-between">
					<Logo className="mx-auto" />
					<button
						className="cursor-pointer block lg:hidden"
						onClick={toggleNavMobi}
					>
						{showNavMobi ? (
							<MdClose className="text-4xl" />
						) : (
							<HiMenu className="text-4xl" />
						)}
					</button>
				</div>
				<Navigate />
				{showNavMobi && <NaviMobi />}
			</div>
		</header>
	);
}

export default Header;
