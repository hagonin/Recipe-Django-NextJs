import Link from 'next/link';

export default function Button({
	children,
	className = '',
	icon = {
		left: false,
		right: false,
	},
	type = 'button',
	href,
	linkoutside,
	...props
}) {
	let Component = 'button';
	const _props = { ...props };

	if (type === 'link' && href) {
		Component = linkoutside ? 'a' : Link;
		_props.href = href;
	} else {
		_props.type = type;
	}

	return (
		<Component
			className={`btn ${className}`}
			{..._props}
		>
			{icon.left && (
				<span className="mr-3 relative -top-[1px]">{icon.left}</span>
			)}
			{children}
			{icon.right && (
				<span className="ml-3 relative -top-[1px]">{icon.right}</span>
			)}
		</Component>
	);
}
