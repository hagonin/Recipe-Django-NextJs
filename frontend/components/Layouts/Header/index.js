import { useRouter } from 'next/router';
import { useAuthContext } from '@context/auth-context';

import Navigate from './Navigate';
import NavMobi from './NavMobi';
import SocialLink from '@components/UI/SocialLink';
import SearchForm from '@components/Form/SearchForm';
import User from '@components/Layouts/Header/User';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';

function Header() {
	const { isAuthenticated, user, loading } = useAuthContext();
	const router = useRouter();
	const handleSearch = (data) => {
		router.push({ pathname: '/search', query: { ...data } });
	};

	return (
		<header>
			<div className="bg-primary h-search-bar text-white fixed top-0 left-0 w-full z-[444]">
				<div className="container h-full flex items-center">
					<SearchForm onSubmit={handleSearch} />
					<div className="md:block hidden ml-auto">
						<SocialLink />
					</div>
					<div className="border-l border-[rgba(255,255,255,0.5)] pl-5 ml-5 max-lg:hidden">
						{loading ? (
							<Loader type="btn-user" />
						) : isAuthenticated ? (
							<User
								username={user?.username}
								email={user?.email}
								avatar={user?.avatar}
							/>
						) : (
							<Button
								type="link"
								href="/login"
								className="rounded-full hover:border-white  h-8 !tracking-wider !text-[11px]"
							>
								Login
							</Button>
						)}
					</div>
				</div>
			</div>
			<NavMobi />
			<Navigate />
		</header>
	);
}

export default Header;
