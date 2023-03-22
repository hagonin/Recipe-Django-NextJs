import { useRouter } from 'next/router';
import { images } from '@utils/constants';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';

function NotFound() {
	const router = useRouter();
	return (
		<div className="flex bg-third  min-h-screen">
			<div className="container m-auto flex flex-col justify-center items-center lg:flex-row max-md:-translate-y-10">
				<div className="flex items-center ">
					<Img
						src={images.notfound}
						alt="notfound"
						className="md:w-[400px]  md:h-72 h-64 w-72 mx-auto"
					/>
				</div>
				<div className='text-center'>
					<h1 className="font-serif font-semibold tracking-widest">
						Page Not Found
					</h1>
					<p className="md:text-lg text-base mt-3">
						It's looking like you may have taken the wrong turn.
						<br className="hidden md:block" /> Don't worry... it
						happens to the most of us.
					</p>
					<Button
						onClick={() => router.push('/')}
						className="mt-6 primary lg shadow-xl"
					>
						Go back to our home page
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
