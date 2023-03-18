import ToastMessage from '@components/UI/ToastMessage';
import { toast } from 'react-hot-toast';

function toastMessage({ message, type = 'success' }) {
	return toast.custom((t) => (
		<ToastMessage
			message={message}
			type={type}
			id={t.id}
			visible={t.visible}
			
		/>
	));
}

export default toastMessage;
