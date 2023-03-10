import Button from '@components/UI/Button';
import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Label, TextAreaField } from '../FormControl';

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
			<Label label="Notes" />
			{show ? (
				<>
					<button
						className="float-right ml-2"
						onClick={handleClose}
					>
						<AiOutlineMinusCircle />
					</button>
					<TextAreaField
						name="recipe.notes"
						rows="5"
						register={register}
					/>
				</>
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
