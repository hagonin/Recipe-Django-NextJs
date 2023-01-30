import Link from 'next/link';

export default function Button({
	href,
	children,
	styles = {
		tag: false,
		primary: false,
		lgSize: false,
	},
	className = '',
	icon = {
		left: false,
		right: false,
	},
	type = 'button',
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

	let style = Object.keys(styles)
		.filter((key) => styles[key])
		.join(' ');

	return (
		<Component
			className={`btn ${style} ${className}`}
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
