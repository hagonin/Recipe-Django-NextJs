import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { images } from '@utils/constants';
import { BsUpload } from 'react-icons/bs';
import { MdChangeCircle, MdDelete } from 'react-icons/md';
import Img from '@components/UI/Image';

function Preview({ name, handleChangeImage, handleDelete }) {
	const [preview, setPreview] = useState(null);
	const inputRef = useRef();

	const handleChange = (e) => {
		const [file] = e.target.files;
		setPreview(createUrl(file));
		handleChangeImage(name, createForm('images', file));
	};

	const createForm = useCallback((key, file) => {
		const form = new FormData();
		file && form.append(key, file, file.name);
		return form;
	});

	const createUrl = useCallback((file) =>
		file ? URL.createObjectURL(file) : null
	);

	const handleClick = useCallback(() => inputRef.current.click());

	useEffect(() => {
		return () => {
			preview && URL.revokeObjectURL(preview);
		};
	}, [preview]);

	return (
		<div className="relative px-3 py-5 mt-5 h-44 w-full group">
			<input
				type="file"
				accept="image/*"
				onChange={handleChange}
				ref={inputRef}
				className="hidden"
			/>

			<Img
				src={preview || images.recipe_default}
				alt="default"
				className={`h-full w-full mx-auto ${preview ? '' : 'mx-auto'}`}
			/>
			<div className="text-2xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all">
				<button
					className="p-2 rounded-full bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,1)] transition-all duration-300"
					onClick={handleClick}
				>
					{preview ? <MdChangeCircle /> : <BsUpload />}
				</button>
				<button
					className="p-2 rounded-full bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,1)] hover:text-red transition-all duration-300"
					onClick={handleDelete}
				>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

export default memo(Preview);
