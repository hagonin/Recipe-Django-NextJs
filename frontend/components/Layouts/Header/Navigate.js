import { useState } from 'react';
import Link from 'next/link';
import { FaAngleDown } from 'react-icons/fa';
import { NavLinks } from '@utils/constants';

function Navigate({ isMobi }) {
	const [isHover, setIsHover] = useState(false);

	return (
		<nav
			className={`bg-white  ${
				isMobi
					? 'absolute top-full w-full  shadow-lg lg:hidden'
					: 'max-lg:hidden'
			}`}
		>
			<div
				className={`container  flex justify-center items-center ${
					isMobi ? 'flex-col border-t' : 'border-y'
				}`}
			>
				{NavLinks.map((nav) =>
					nav.children ? (
						<div
							key={nav.id}
							className={`text-sm ${
								isMobi && 'text-center'
							} uppercase font-semibold py-4 px-5  cursor-pointer relative group `}
							onMouseEnter={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
						>
							<span className="group-hover:text-primary ">
								{nav.name}
							</span>
							<FaAngleDown className="inline-block ml-2" />
							{isHover && (
								<div
									className={`min-w-[200px] top-full  right-0 bg-white     ${
										isMobi
											? 'relative left-0 top-3'
											: 'absolute left-5 shadow-md border-t border-primary'
									}`}
								>
									{nav.children.map((child) => (
										<Link
											key={child.id}
											href={`/categories/${child.href}`}
											className={`block py-3 px-5 hover:text-primary ${
												isMobi
													? ''
													: 'border-b border-[rgba(0,0,0,0.04)] hover:bg-[rgba(0,0,0,0.02)] '
											}`}
										>
											{child.name}
										</Link>
									))}
								</div>
							)}
						</div>
					) : (
						<Link
							key={nav.id}
							href={nav.href}
							className="text-sm uppercase font-semibold px-5 py-4 hover:text-primary"
						>
							{nav.name}
						</Link>
					)
				)}
			</div>
		</nav>
	);
}

export default Navigate;
