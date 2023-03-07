import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { useRouter } from 'next/router';

function NotFound() {
	const router = useRouter();
	return (
		<div className="py-20 text-center">
			<Img
				src={images.notfound}
				alt="notfound"
				className="h-56 mx-auto"
			/>
			<h1 className='mt-5'>Sorry. There is nothing here</h1>
			<Button
				onClick={() => router.push('/')}
				className="mt-7 primary lg"
			>
				Go home
			</Button>
		</div>
	);
}

export default NotFound;
