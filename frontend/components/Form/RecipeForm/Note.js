import Button from '@components/UI/Button';
import { useEffect, useState } from 'react';
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
				<div className="relative">
					<TextAreaField
						label="Note (optional)"
						name="recipe.notes"
						rows="5"
						register={register}
					/>
					<button
						className="absolute top-2 right-2"
						onClick={handleClose}
					>
						<IoIosCloseCircleOutline />
					</button>
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
