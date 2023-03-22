import CountDown from '@components/Countdown';
import { REQUESR_EXPIRE } from '@utils/constants';
import { useState } from 'react';
import ModalPrimary from './ModalPrimary';

function ModalExpire() {
	const [show, setShow] = useState(true);
	const handleCloseModal = () => setShow(false);
	return (
		<ModalPrimary
			show={show}
			handleCloseModal={handleCloseModal}
		>
			<CountDown
				timer={REQUESR_EXPIRE}
				handleCloseModal={handleCloseModal}
			/>
		</ModalPrimary>
	);
}

export default ModalExpire;
