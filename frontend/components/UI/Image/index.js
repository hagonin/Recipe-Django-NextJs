import Image from 'next/image';

function Img({ alt, src, className, cover, ...props }) {
	return (
		<div className={`relative ${className}`}>
			<Image
				src={src}
				alt={alt}
				priority={true}
				fill
				style={{
					objectFit: cover ? 'cover' : 'contain',
				}}
				sizes="(max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              33vw"
				{...props}
			/>
		</div>
	);
}

export default Img;
