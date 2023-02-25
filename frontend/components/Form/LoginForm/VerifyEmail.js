import Button from '@components/UI/Button';
import { Fragment, useEffect, useState } from 'react';
import { useAuthContext } from '@context/auth-context';
import { Transition } from '@headlessui/react';
import { images } from '@utils/constants';
import { GrClose } from 'react-icons/gr';

import Img from '@components/UI/Image';
import Modal from '@components/UI/Modal';

function VerifyEmail({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const [show, setShow] = useState(false);
	useEffect(() => {
		errors?.login?.verify_expired ? setShow(true) : setShow(false);
	}, [errors]);

	const handleCloseModal = () => {
		setErrors(null);
	};
	return (
		<Modal
			show={show}
			handleClose={handleCloseModal}
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
				<div className="absolute text-center z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md shadow-lg w-1/2">
					<button
						className="absolute top-4 right-4 md:text-3xl text-4xl"
						onClick={handleCloseModal}
					>
						<GrClose />
					</button>
					<Img
						src={images.not_verify_email}
						alt="not_verify_email"
						className="h-36 w-36 mx-auto"
					/>
					<h2 className="mt-5">Please Verify Your Email</h2>
					<p className="mt-3">
						We have sent an email to email to verify your email
						address and activate your account. The link in the email
						will<b> expire in 3 hours.</b>
					</p>

					<span className="block my-3">
						Still cannot find the email ? <br />
					</span>
					<Button
						className="verify"
						onClick={onSubmit}
					>
						Resend Verify email
					</Button>
				</div>
			</Transition.Child>
		</Modal>
	);
}

export default VerifyEmail;
