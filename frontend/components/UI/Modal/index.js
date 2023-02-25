import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

function Modal({ children, handleClose, show }) {
	return (
		<Transition.Root
			show={show}
			as={Fragment}
		>
			<div className="fixed inset-0 z-[999]">
				<Transition.Child
					as={Fragment}
					enter="transition duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave=" transition"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="absolute inset-0 z-10 bg-[rgba(0,0,0,0.15)]"
						onClick={handleClose}
					></div>
				</Transition.Child>
				{children}
			</div>
		</Transition.Root>
	);
}

export default Modal;
