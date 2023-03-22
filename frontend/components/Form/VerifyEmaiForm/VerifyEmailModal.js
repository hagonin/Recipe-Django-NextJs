import { useEffect, useState } from 'react';
import { useAuthContext } from '@context/auth-context';
import { images } from '@utils/constants';

import Img from '@components/UI/Image';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import VerifyEmailForm from '.';

function VerifyEmail({email}) {
	const { errors, setErrors } = useAuthContext();
	const [show, setShow] = useState(false);

	const handleCloseModal = () => {
		setErrors(null);
	};

	useEffect(() => {
		errors?.login?.verify_expired ? setShow(true) : setShow(false);
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
			<h2 className="mt-5">Your email has not verified yet.</h2>

			<span className="block my-3">
				Still cannot find the email ? <br />
			</span>
			<VerifyEmailForm handleEffectAfterResend={handleCloseModal} />
		</ModalPrimary>
	);
}

export default VerifyEmail;
