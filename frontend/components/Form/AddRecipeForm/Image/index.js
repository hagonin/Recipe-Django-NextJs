import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { useEffect, useRef, useState } from 'react';
import { BsCamera } from 'react-icons/bs';

function Image({ handleChooseImg }) {
	const [preview, setPreview] = useState(null);
	const inputFileRef = useRef();

	const handleOnChange = (e) => {
		const [file] = e.target.files;
		if (file) {
			const url = URL.createObjectURL(file);
			setPreview(url);
			handleChooseImg(file);
		}
	};

	useEffect(() => {
		return () => {
			preview && URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const handleOnClick = () => {
		inputFileRef.current.click();
	};

	return (
		<div className="relative w-56 h-56 bg-primary rounded-md overflow-hidden">
			<Img
				src={preview || images.photoDefault}
				alt="preview"
				className="absolute inset-0 "
			/>
			<input
				type="file"
				onChange={handleOnChange}
				ref={inputFileRef}
				className="hidden"
				accept="image/png, image/jpeg"
			/>
			<button
				className="text-3xl bg-white absolute bottom-2 right-2 p-4 rounded-full border-[3px] border-yellow-500"
				title="Choose image"
				onClick={handleOnClick}
				type="button"
			>
				<BsCamera />
			</button>
		</div>
	);
}

export default Image;
