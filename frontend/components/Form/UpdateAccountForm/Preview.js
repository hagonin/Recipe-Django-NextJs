import { useRef, useState } from 'react';
import { images } from '@utils/constants';

import Img from '@components/UI/Image';
import Button from '@components/UI/Button';

function PreviewImg({ avatar, handleOnChangeImg }) {
	const [preview, setPreview] = useState(avatar);

	const inputRef = useRef();
	const handleClick = () => {
		inputRef.current.click();
	};

	const handleChange = (e) => {
		const [file] = e.target.files;
		if (file) {
			const url = URL.createObjectURL(file);
			setPreview(url);
			handleOnChangeImg(e);
		}
	};

	return (
		<>
			<Img
				src={preview || images.defaultAvatar}
				alt="avatar_default"
				className="h-52 w-52 border border-border rounded-full mx-auto overflow-hidden"
				cover
			/>

			<input
				type="file"
				accept="image/*"
				onChange={handleChange}
				ref={inputRef}
				className="hidden"
			/>

			<Button
				className="mt-7 lg:min-w-[250px]"
				onClick={handleClick}
			>
				Change Avatar
			</Button>
		</>
	);
}

export default PreviewImg;
