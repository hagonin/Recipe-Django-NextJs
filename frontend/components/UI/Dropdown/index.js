import { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Button from '../Button';

function DropDown({ children, label }) {
	const [show, setShow] = useState(false);
	return (
		<div className="relative inline-block mt-2">
			<Button
				className="primary"
				onClick={() => setShow(!show)}
			>
				{label}
			</Button>

			{show && (
				<div className="flex relative flex-wrap flex-col md:flex-row gap-4 mt-4 before:content-[''] before:absolute before:-top-4 before:h-6 before:w-full before:bg-transparent">
					{children.map((child) => child)}
				</div>
			)}
		</div>
	);
}

export default DropDown;

export const Child = ({ children }) => children;
