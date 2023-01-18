import Link from 'next/link';
import { NavLinks } from '../../../utils/constants';

function Header() {
	return (
		<header className="flex bg-slate-100">
			{NavLinks.map((nav) => (
				<Link
					key={nav.id}
					href={nav.href}
					className="font-bold border p-3 m-2"
				>
					{nav.name}
				</Link>
			))}
		</header>
	);
}

export default Header;
