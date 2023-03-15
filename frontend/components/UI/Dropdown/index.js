import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '../Button';

function DropDown({ children }) {
	const [show, setShow] = useState(true);
	return (
		<div
			className="relative"
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			<Button
				icon={{ right: <BsArrowRight /> }}
				className="primary"
			>
				Select an action
			</Button>

			{show && (
				<div className="pl-5 absolute left-full top-1/2 -translate-y-1/2  z-[222] bg-white flex gap-4 ">
					{children.map((child) => child)}
				</div>
			)}
		</div>
	);
}

export default DropDown;

export const Child = ({ children }) => children;
