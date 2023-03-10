import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { GrClose } from 'react-icons/gr';
import Modal from '.';

function ModalPrimary({ show, handleCloseModal, children, disabled, noClose }) {
	return (
		<Modal
			show={show}
			handleClose={handleCloseModal}
			disabled={disabled}
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
				<div className="absolute w-4/5 lg:w-1/3 md:w-1/2 text-center z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg">
					{noClose ? null : (
						<button
							className="absolute top-4 right-4 md:text-3xl text-4xl"
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
