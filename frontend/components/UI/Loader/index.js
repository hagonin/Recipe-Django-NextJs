import { images } from '@utils/constants';
import Img from '../Image';

function Loader({ type }) {
	switch (type) {
		case 'single-recipe':
			return (
				<div className="animate-pulse mb-8">
					<div className="h-7 bg-gray-200 rounded-md max-w-[640px] mb-2.5 mx-auto"></div>
					<div className="h-3 bg-gray-200 rounded-md w-32 mb-2.5 mx-auto"></div>
					<div className="flex items-center justify-center h-72 mb-4 bg-gray-200 rounded ">
						<svg
							className="w-12 h-12 text-gray-100"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 640 512"
						>
							<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
						</svg>
					</div>
					<div className="h-10 bg-gray-200 rounded-md mb-2.5 mx-auto"></div>
				</div>
			);
		case 'recipe-small-card':
			return (
				<div className="animate-pulse flex  gap-4 items-center">
					<div className="h-24 w-32 bg-gray-200 rounded-md"></div>
					<div className="w-full">
						<div className="h-4 w-full  bg-gray-200 rounded-md"></div>
						<div className="h-3 w-1/2 bg-gray-200 rounded-md mt-3"></div>
						<div className="h-2 w-1/5 bg-gray-200 rounded-md mt-3"></div>
					</div>
				</div>
			);
		case 'recipe-lg-card':
			return (
				<div className="animate-pulse flex md:flex-row flex-col gap-4 items-center">
					<div className="h-56 w-[580px] bg-gray-200 rounded-md"></div>
					<div className="w-full">
						<div className="h-8 w-full  bg-gray-200 rounded-md"></div>
						<div className="h-5 w-1/2 bg-gray-200 rounded-md mt-3"></div>
						<div className="h-4 w-1/5 bg-gray-200 rounded-md mt-3"></div>
					</div>
				</div>
			);
		case 'recipe-card':
			return (
				<div className="animate-pulse  w-full border bg-white shadow-md rounded-md">
					<div className="h-48 w-full bg-gray-200"></div>
					<div className="px-3 py-6">
						<div className="h-6 w-full  bg-gray-200 rounded-md "></div>
						<div className="flex gap-2 justify-between items-center">
							<div className="h-3 w-1/2 bg-gray-200 rounded-md mt-3"></div>
							<div className="h-2 w-1/5 bg-gray-200 rounded-md mt-3"></div>
						</div>
					</div>
				</div>
			);
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
				<div className="animate-smoothbounceball m-auto  p-4 rounded-full">
					<Img
						src={images.cooking}
						alt="loader"
						className="h-20 w-20"
					/>
				</div>
			);
		case 'square':
			return (
				<div className="animate-pulse  h-48 w-full border bg-gray-200 shadow-md rounded-md"></div>
			);
		case 'square-small':
			return (
				<div className="animate-pulse  h-32 w-full border bg-gray-200 shadow-md rounded-md"></div>
			);
		case 'slider':
			return (
				<div className="flex lg:gap-6 md:gap4 gap-2">
					<div className="animate-pulse  h-[400px] w-full border bg-gray-200 shadow-md rounded-md"></div>
					<div className="animate-pulse  h-[400px] w-full border bg-gray-200 shadow-md rounded-md hidden md:block"></div>
					<div className="animate-pulse  h-[400px] w-full border bg-gray-200 shadow-md rounded-md hidden lg:block"></div>
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
