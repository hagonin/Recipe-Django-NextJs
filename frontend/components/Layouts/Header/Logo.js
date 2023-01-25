import Image from 'next/image';

function Logo() {
	return (
		<div className="relative lg:h-52 lg:w-80 h-20 w-28">
			<Image
				src="/static/images/logo.png"
				alt="logo"
				priority={true}
				fill
				style={{ objectFit: 'contain' }}
				sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
			/>
		</div>
	);
}

export default Logo;
