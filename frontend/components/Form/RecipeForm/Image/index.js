import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { useEffect, useRef, useState } from 'react';
import { BsCamera } from 'react-icons/bs';

function Image({ handleChooseImg, urlInit }) {
	const [preview, setPreview] = useState(urlInit);
	const inputFileRef = useRef();

	const handleOnChange = (e) => {
		const [file] = e.target.files;
		if (file?.name) {
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
		<div className="mx-auto relative w-56 h-56 max-md:mx-auto overflow-hidden">
			<Img
				src={preview || images.photoDefault}
				alt="preview"
				className="absolute inset-0 w-full h-full"
				cover
			/>
			<input
				type="file"
				onChange={handleOnChange}
				ref={inputFileRef}
				className="hidden"
				accept="image/*"
			/>
			<button
				className="text-2xl bg-white absolute bottom-2 right-2 p-3 rounded-full border-[3px] border-yellow-500 hover:opacity-80"
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
