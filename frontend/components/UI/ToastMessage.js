import { images } from '@utils/constants';
import { toast } from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import Img from './Image';

function ToastMessage({ message, type, id, visible }) {
	return (
		<>
			
			<div
				className={`flex items-center gap-4 border rounded-md py-2 px-4 bg-white shadow-lg ${
					type === 'error'
						? 'border-red'
						: type === 'success'
						? 'border-primary'
						: null
				} transition-all duration-300 opacity-0 ${
					visible ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{type === 'success' ? (
					<Img
						src={images.toast_success}
						className="h-8 w-8"
						alt="success"
						cover
					/>
				) : 'error' ? (
					<Img
						src={images.toast_error}
						className="h-8 w-8"
						alt="success"
						cover
					/>
				) : (
					'null'
				)}
				<span>{message}</span>
				<button
					onClick={() => toast.dismiss(id)}
					className="hover:text-red"
				>
					<MdClose />
				</button>
			</div>
		</>
	);
}

export default ToastMessage;
