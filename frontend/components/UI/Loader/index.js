import { RiLoader2Line } from 'react-icons/ri';

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
			return <RiLoader2Line className=" h-5 w-5 animate-spin-slow" />;
		case 'skeleton':
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
		default:
			return <span>Loader</span>;
	}
}

export default Loader;
