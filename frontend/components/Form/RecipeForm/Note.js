import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { Label, TextAreaField } from '../FormControl';
import Button from '@components/UI/Button';

function Note({ register, handleUngister, handleRegister, initValue }) {
	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
		handleUngister('recipe.notes');
	};

	const handleOpen = () => {
		setShow(true);
		handleRegister('recipe.notes');
	};
	useEffect(() => {
		initValue && setShow(true);
	}, []);

	return (
		<>
			<Label label="Note" />
			{show ? (
				<div className='relative'>
					<button
						className="absolute -top-6 right-0"
						onClick={handleClose}
					>
						<AiOutlineMinusCircle />
					</button>
					<TextAreaField
						name="recipe.notes"
						rows="5"
						register={register}
					/>
				</div>
			) : (
				<Button
					onClick={handleOpen}
					className="border-2 border-primary"
				>
					+ Add note
				</Button>
			)}
		</>
	);
}

export default Note;
