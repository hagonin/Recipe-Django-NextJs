import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { useRouter } from 'next/router';

function NotFound() {
	const router = useRouter();
	return (
		<div className="py-20 text-center flex flex-col md:flex-row justify-center items-center min-h-screen bg-third">
			<div>
				<span className="text-[10rem] font-bold text-primary">404</span>
				<h1 className="mt-5 font-serif">Sorry. There is nothing here</h1>
				<Button
					onClick={() => router.push('/')}
					className="mt-7 primary lg shadow-xl"
				>
					Go home
				</Button>
			</div>
			<div>
				<Img
					src={images.notfound}
					alt="notfound"
					className="md:h-72 md:w-72 h-56 w-56 mx-auto md:relative md:-top-10"
				/>
			</div>
		</div>
	);
}

export default NotFound;
