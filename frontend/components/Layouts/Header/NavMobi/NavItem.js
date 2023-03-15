import Link from 'next/link';

function NavItem({ href, children, isSubItem, ...props }) {
	const Component = href ? Link : 'button';

	return (
		<Component
			href={href}
			className={`text-medium text-left flex justify-between items-center w-full py-3 px-5  hover:bg-[rgba(0,0,0,0.06)] transition-all duration-300 ${
				isSubItem && 'mx-5'
			}`}
			{...props}
		>
			{children}
		</Component>
	);
}

export default NavItem;
