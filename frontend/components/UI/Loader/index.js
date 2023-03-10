import { images } from '@utils/constants';
import Img from '../Image';

function Loader({ type }) {
	switch (type) {
		case 'submitting':
			return (
				<svg
					className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			);
		case 'searching':
			return (
				<svg
					className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="3"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			);
		case 'profile':
			return (
				<>
					<div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
					<div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
					<span className="sr-only">Loading...</span>
				</>
			);
		case 'btn-user':
			return (
				<div className="rounded-full bg-slate-200 h-10 w-10 animate-pulse"></div>
			);
		case 'handle':
			return (
				<div className="animate-smoothbounceball m-auto bg-white shadow-lg p-4 rounded-full">
					<Img
						src={images.cooking}
						alt="loader"
						className="h-16 w-16"
					/>
				</div>
			);
		default:
			return (
				<div className="animate-pulse ">
					<div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4 mx-auto"></div>
					<div className="h-2.5 bg-gray-200 rounded-full w-48 mx-auto"></div>
				</div>
			);
	}
}

export default Loader;
