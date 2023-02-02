import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Portal from './Portal';

function Modal({ children }) {
	const [showModal, setShowModal] = useState(true);
	const handleClose = () => {
		setShowModal(false);
	};
	return (
		<Portal open={showModal}>
			<div className="fixed inset-0 flex">
				<div className="absolute inset-0 bg-[rgba(0,0,0,0.05)]"></div>
				<div className="relative bg-white shadow-md rounded z-10 m-auto py-14 px-10">
					<button
						onClick={handleClose}
						className="text-4xl font-bold absolute top-3 right-3"
					>
						<MdClose />
					</button>

					{children}
				</div>
			</div>
		</Portal>
	);
}

export default Modal;
