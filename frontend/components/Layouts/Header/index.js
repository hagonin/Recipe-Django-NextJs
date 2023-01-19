import Link from 'next/link';
import { NavLinks } from '@utils/constants';

function Header() {
	return (
		<header className="flex bg-slate-100">
			<div className="container bg-yellow-300 flex max-sm:flex-col">
				{NavLinks.map((nav) => (
					<Link
						key={nav.id}
						href={nav.href}
						className="font-bold border p-3 m-2 block"
					>
						{nav.name}
					</Link>
				))}
			</div>
		</header>
	);
}

export default Header;
