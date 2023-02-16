import { memo, useEffect, useRef } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import { MdDelete } from 'react-icons/md';

function RecipeImages({ image, handleChangeImg, handleDelImage }) {
	const fileRef = useRef();
	const handleClick = () => {
		fileRef.current.click();
	};

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(image);
		};
	}, [image]);

	return (
		<>
			{image && (
				<div className="text-center mt-3">
					<Img
						alt="recipe"
						src={image}
						className="h-56"
					/>

					<button
						className="text-2xl mt-2 hover:text-red"
						onClick={handleDelImage}
					>
						<MdDelete />
					</button>
				</div>
			)}
			<input
				id="recipe.image"
				name="recipe.image"
				type="file"
				onChange={handleChangeImg}
				className="hidden"
				ref={fileRef}
			/>
			<Button
				onClick={handleClick}
				icon={{ left: <BsFillCameraFill /> }}
			>
				{image ? 'Change Image' : 'Add Image'}
			</Button>
		</>
	);
}

export default memo(RecipeImages);
