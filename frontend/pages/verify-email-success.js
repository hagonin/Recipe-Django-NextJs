import { useRouter } from 'next/router';

import Img from '@components/UI/Image';
import { images } from '@utils/constants';

function VerifyEmailSuccess() {
	const router = useRouter();
	return (
		<div className="container py-14 text-center">
			<Img
				src={images.verify_email}
				alt="not_verify_email"
				className="h-36 w-36 mx-auto"
			/>
			<h3 className="mt-5">Your email address has been verified.</h3>

			<h3 className="block my-3">
				Now you can{' '}
				<button
					onClick={() => router.push('/login')}
					className="font-medium underline text-primary"
				>
					Login
				</button>
			</h3>
		</div>
	);
}

export default VerifyEmailSuccess;
