import { images } from '@utils/constants';
import { MdClose } from 'react-icons/md';
import Img from './Image';

function ToastMessage({ message, type }) {
	return (
		<div
			className={`flex items-center gap-6 border-2 rounded-md py-2 px-4 bg-white shadow-[1px_0px_10px_0px_rgba(0,0,0,0.0.07)] ${
				type === 'error'
					? 'border-[#E38D86]'
					: type === 'success'
					? 'border-primary'
					: null
			} `}
		>
			{type === 'success' && (
				<Img
					src={images.toast_success}
					className="h-8 w-8"
					alt="success"
					cover
				/>
			)}
			<span>{message}</span>
			<button>
				<MdClose />
			</button>
		</div>
	);
}

export default ToastMessage;
