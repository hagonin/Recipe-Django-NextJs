import SocialLink from '@components/UI/SocialLink';
import Navigate from './Navigate';
import NavMobi from './NavMobi';
import Logo from '@components/Layouts/Header/Logo';
import SearchForm from '@components/Form/SearchForm';
import User from '@components/Layouts/Header/User';
import Button from '@components/UI/Button';

function Header() {
	return (
		<header>
			<div className="bg-primary sm:h-12 h-14 text-white">
				<div className="container h-full flex items-center">
					<SearchForm />
					<div className="md:block hidden ml-auto">
						<SocialLink />
					</div>
					<div className="border-l border-[rgba(255,255,255,0.5)] pl-5 ml-5 max-lg:hidden">
						{/* <User /> */}
						<Button
							type="link"
							href="/login"
							rounded
						>
							Login
						</Button>
					</div>
				</div>
			</div>
			<div className="relative">
				<div className="container flex items-center lg:justify-center justify-between relative max-lg:border-b">
					<Logo className="mx-auto" />
					<NavMobi />
				</div>
				<Navigate />
			</div>
		</header>
	);
}

export default Header;
