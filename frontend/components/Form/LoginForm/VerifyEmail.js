import Button from '@components/UI/Button';
import { Fragment, useEffect, useState } from 'react';
import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import Img from '@components/UI/Image';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';

function VerifyEmail({ onSubmit }) {
	const { errors, setErrors } = useAuthContext();
	const [show, setShow] = useState(false);
	useEffect(() => {
		errors?.login?.verify_expired ? setShow(true) : setShow(false);
	}, [errors]);

	const handleCloseModal = () => {
		setErrors(null);
	};

	const handleSubmit = () => {
		onSubmit();
		// setShow(false);
	};

	useEffect(() => {
		!errors && show && setShow(false);
	}, [errors]);
	return (
		<ModalPrimary
			show={show}
			handleCloseModal={handleCloseModal}
		>
			<Img
				src={images.not_verify_email}
				alt="not_verify_email"
				className="h-36 w-36 mx-auto"
			/>
			<h2 className="mt-5">Please Verify Your Email</h2>
			<p className="mt-3">
				We have sent an email to email to verify your email address and
				activate your account. The link in the email will
				<b> expire in 3 hours.</b>
			</p>

			<span className="block my-3">
				Still cannot find the email ? <br />
			</span>
			<Button
				className="verify"
				onClick={handleSubmit}
			>
				Resend Verify email
			</Button>
		</ModalPrimary>
	);
}

export default VerifyEmail;
