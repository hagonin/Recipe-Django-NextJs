import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import { memo, useEffect, useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

function RecipeImages({ setRecipeImgs }) {
	const [images, setImages] = useState([]);
	const fileRef = useRef();
	const handleChange = (e) => {
		const blob = URL.createObjectURL(e.target.files[0]);
		setImages((pre) => [...pre, blob]);
	};

	const handleDelete = (index) => {
		setImages((pre) => {
			return [...pre].filter((item, i) => i !== index);
		});
	};

	const handleClick = () => {
		fileRef.current.click();
	};

	useEffect(() => {
		setRecipeImgs(images);
	}, [images]);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:gap-6 md:gap-4 gap-2 mt-10 border border-border p-4">
				{images.map((img, index) => (
					<div
						className="relative basis-full group"
						key={index}
					>
						<Img
							alt={`recipe ${index}`}
							src={img}
							className="h-56 w-full"
						/>

						<button
							className="mt-1 w-full hover:text-red invisible group-hover:visible "
							onClick={() => handleDelete(index)}
						>
							Delete
						</button>
					</div>
				))}
			</div>
			<input
				id="recipe.image"
				name="recipe.image"
				type="file"
				onChange={handleChange}
				className="hidden"
				ref={fileRef}
			/>
			<Button
				onClick={handleClick}
				icon={{ left: <BsFillCameraFill /> }}
			>
				Add image
			</Button>
		</>
	);
}

export default memo(RecipeImages);
