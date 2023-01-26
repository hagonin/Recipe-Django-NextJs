import Link from 'next/link';

function Button({
	href,
	children,
	primary = false,
	secondary = false,
	outline = false,
	size = 'md',
	full,
	rounded,
	iconLeft,
	iconRight,
	className,
	type = 'button',
	linkoutside,
	disabled,
	...props
}) {
	let Component = 'button';
	const _props = { ...props, disabled };

	if (type === 'link' && href) {
		Component = linkoutside ? 'a' : Link;
		_props.href = href;
	} else {
		_props.type = type;
	}

	// color
	if (primary) {
		className += ' text-white bg-primary enabled:hover:bg-primaryDark';
	} else if (secondary) {
		className +=
			' text-black bg-grey enabled:hover:bg-primary enabled:hover:text-white';
	} else if (outline) {
		className += 'border border-primary';
	} else {
		className +=
			' text-black bg-white border border-border enabled:hover:bg-primary enabled:hover:text-white';
	}

	// size
	if (size === 'small') {
		className += ' font-light text-[0.7rem] h-[24px] px-3';
	} else if (size === 'md') {
		className += ' h-[36px] px-4';
	} else if (size === 'lg') {
		className += ' h-[47px] px-5';
	}

	return (
		<Component
			className={`text-sm font-normal uppercase flex items-center justify-center ${
				rounded ? 'rounded-full' : 'rounded'
			} ${full ? 'w-full' : ''}
			 transition-all duration-300  ${className} ${
				disabled ? 'opacity-70 select-none' : 'select-auto '
			}`}
			{..._props}
		>
			{iconLeft && (
				<span className="mr-3 relative -top-[1px]">{iconLeft}</span>
			)}
			{children}
			{iconRight && (
				<span className="ml-3 relative -top-[1px]">{iconRight}</span>
			)}
		</Component>
	);
}

export default Button;
