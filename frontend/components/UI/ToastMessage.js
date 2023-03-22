import { Fragment, useLayoutEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import { Transition } from '@headlessui/react';
import { images } from '@utils/constants';
import Img from './Image';

function ToastMessage({ message, type, id, visible }) {
	const [show, setShow] = useState(false);
	useLayoutEffect(() => {
		setShow(visible);
	}, [visible]);

	return (
		<>
			<Transition
				show={show}
				as={Fragment}
				enter="transition duration-500 opacity-0 translate-x-[500px] "
				enterFrom="opacity-0 translate-x-[500px]"
				enterTo="opacity-100 translate-x-[0]"
				leave=" transition duration-500 opacity-0 translate-x-[0]"
				leaveFrom="opacity-100 translate-x-[0]"
				leaveTo="opacity-100 translate-x-[500px]"
			>
				<div
					className={`flex items-center gap-2  rounded py-[6px] px-3 bg-white shadow-xl relative top-10 ${
						type === 'error'
							? 'border border-l-4 border-red2 bg-red4 text-red '
							: type === 'success'
							? 'border-primaryDark border border-l-4 text-black bg-primary3'
							: null
					}`}
				>
					{type === 'success' ? (
						<Img
							src={images.toast_success}
							className="h-7 w-7 relative -top-[2px]"
							alt="success"
							cover
						/>
					) : type === 'error' ? (
						<Img
							src={images.toast_error}
							className="h-7 w-7 relative -top-[2px]"
							alt="success"
							cover
						/>
					) : (
						'null'
					)}
					<span className="text-base">{message}</span>
					<button
						onClick={() => toast.dismiss(id)}
						className="hover:text-red"
					>
						<MdClose />
					</button>
				</div>
			</Transition>
		</>
	);
}

export default ToastMessage;
