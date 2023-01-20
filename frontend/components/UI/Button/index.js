import Link from 'next/link';

function Button({
	type,
	href,
	children,
	primary = false,
	secondary = false,
	size = 'md',
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
	} else {
		className +=
			' text-primary bg-white border rounded border-primary hover:bg-primary hover:text-white';
	}

	// size
	if (size === 'small') {
		className += ' font-light text-[0.7rem] h-[24px]';
	} else if (size === 'md') {
		className += ' h-[38px]';
	} else if (size === 'lg') {
		className += ' h-[47px]';
	}

	return (
		<Component
			className={`text-sm uppercase flex items-center justify-center w-full transition-all duration-300 mb-2 ${className}`}
			{..._props}
		>
			{children}
		</Component>
	);
}

export default Button;
