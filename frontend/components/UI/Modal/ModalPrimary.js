import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { GrClose } from 'react-icons/gr';
import Modal from '.';

function ModalPrimary({ show, handleCloseModal, children, disabled, noClose }) {
	return (
		<Modal
			show={show}
			handleClose={handleCloseModal}
			disabled={noClose || disabled}
		>
			<Transition.Child
				as={Fragment}
				enter="transition duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave=" transition"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="absolute max-md:max-w-[90%] text-center z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg py-6 pr-12 pl-8">
					{noClose ? null : (
						<button
							className="absolute top-3 right-3 md:text-3xl text-4xl"
							onClick={handleCloseModal}
							disabled={disabled}
						>
							<GrClose />
						</button>
					)}

					{children}
				</div>
			</Transition.Child>
		</Modal>
	);
}

export default ModalPrimary;
