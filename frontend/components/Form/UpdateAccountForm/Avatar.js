import Img from '@components/UI/Image';
import Button from '@components/UI/Button';
import { images } from '@utils/constants';
import { Controller } from 'react-hook-form';
import { useRef } from 'react';

function Avatar({ control, name, handleChangeAvatar }) {
	const inputRef = useRef();
	const handleClick = () => {
		inputRef.current.click();
	};
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value } }) => {
				return (
					<>
						<div className="h-52 w-52 border border-border rounded-full mx-auto overflow-hidden">
							<Img
								src={value.preview || images.defaultAvatar}
								alt="avatar_default"
								className="w-full h-full"
							/>
						</div>
						<input
							type="file"
							onChange={handleChangeAvatar}
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
			}}
		/>
	);
}

export default Avatar;
