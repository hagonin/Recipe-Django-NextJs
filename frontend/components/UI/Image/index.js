import { images } from '@utils/constants';
import Image from 'next/image';

function Img({ alt, src, cover, className, ...props }) {
	return (
		<div className={`relative ${className}`}>
			<Image
				fill
				src={src || images.image_error}
				alt={alt}
				className={`${cover ? 'object-cover' : 'object-contain'}`}
				sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
				priority
				{...props}
			/>
		</div>
	);
}

export default Img;
