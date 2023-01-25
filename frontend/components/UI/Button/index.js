import Link from 'next/link';

function Button({
	type,
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
	...props
}) {
	let Component = 'button';
	const _props = { ...props };

	if (type === 'link') {
		Component = Link;
		_props.href = href;
	} else if (type === 'linkoutside') {
		Component = 'a';
		_props.href = href;
	}

	// color
	if (primary) {
		className += ' text-white bg-primary hover:bg-primaryDark';
	} else if (secondary) {
		className += ' text-black bg-grey hover:bg-primary hover:text-white';
	} else if (outline) {
		className += 'border border-primary';
	} else {
		className +=
			' text-black bg-white border border-border hover:bg-primary hover:text-white';
	}

	// size
	if (size === 'small') {
		className += ' font-light text-[0.7rem] h-[24px] px-3';
	} else if (size === 'md') {
		className += ' h-[36px] px-4';
	} else if (size === 'lg') {
		className += ' h-[47px] px-5';
	}

	// rounded

	return (
		<Component
			className={`text-sm font-normal uppercase flex items-center justify-center ${
				rounded ? 'rounded-full' : 'rounded'
			} ${full ? 'w-full' : ''}
			} transition-all duration-300 ${className}`}
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
