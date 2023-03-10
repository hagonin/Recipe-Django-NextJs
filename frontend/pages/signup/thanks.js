import VerifyEmailForm from '@components/Form/VerifyEmaiForm';
import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { useRouter } from 'next/router';

function Thanks() {
	const router = useRouter();
	const handleEffectAfterResend = () => router.push('/login');

	return (
		<div className="flex flex-col items-center justify-center py-20 container">
			<Img
				src={images.tick}
				alt="tick"
				className="lg:h-32 lg:w-32  md:h-28 md:w-28 h-24 w-10"
			/>
			<h1 className="mt-6">You are registered</h1>
			<h3 className="mt-2 text-center">
				We have sent an email verify to activate your account. <br />{' '}
				The link in the email will
				<b> expire in 3 hours.</b>
				<br />
				Please check it and
				<button
					className="underline text-primary ml-2"
					onClick={() => router.push('/login')}
				>
					Login
				</button>
			</h3>
			<div className="flex flex-col mt-5">
				<p className="text-lg">If you don't see any verify email.</p>
				<VerifyEmailForm
					handleEffectAfterResend={handleEffectAfterResend}
				/>
			</div>
		</div>
	);
}

export default Thanks;
