import { GrStatusGood } from 'react-icons/gr';
import { ENDPOINT_REGISTER, images } from '@utils/constants';

import SignUpForm from '@components/Form/SignUpForm';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import VerifyEmailForm from '@components/Form/VerifyEmaiForm';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import api from '@services/axios';
import { TitlePrimary } from '@components/UI/Title';

function SignUp() {
	const router = useRouter();
	const { setErrors, setUser } = useAuthContext();
	const [showVerifyModal, setShowVerifyModal] = useState(false);
	const handleSignup = useCallback(async (data) => {
		try {
			const res = await api.post(ENDPOINT_REGISTER, data);
			setUser((pre) => ({ ...pre, email: data.email }));
			setShowVerifyModal(true);
		} catch ({ status, _error, error }) {
			const errors = _error?.errors;
			if (status === 400 && errors) {
				setErrors({
					register: { confirm_password: errors?.error, ...errors },
				});
			}
		}
	});
	const handleEffectAfterResend = useCallback(() => router.push('/login'));

	return (
		<div className="bg-[#ffdff10f] select-none py-14 flex min-h-screen">
			<ModalPrimary
				show={true}
				handleCloseModal={() => setShowVerifyModal(false)}
				noClose={true}
			>
				<div className="flex flex-col items-center justify-center py-10 px-10 container">
					<Img
						src={images.tick}
						alt="tick"
						className="lg:h-32 lg:w-32  md:h-28 md:w-28 h-24 w-24"
					/>
					<h2 className="mt-6">You are registered</h2>
					<p className="mt-2 text-center">
						We have sent an email verify to activate your account. .
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
					</p>
					<div className="flex flex-col mt-4">
						<p className="text-base">
							If you don't see any verify email.
						</p>
						<VerifyEmailForm
							handleEffectAfterResend={handleEffectAfterResend}
						/>
					</div>
				</div>
			</ModalPrimary>
			<div className="container flex md:flex-row flex-col lg:gap-12 gap-6  m-auto">
				<div className="flex flex-col items-center justify-center">
					<Img
						alt="login"
						src={images.signup}
						className="w-full md:h-72 h-44 md:mb-10 mb-3"
					/>
					<TitlePrimary title="Create An Account" />
					<h2 className="font-serif">What you will get?</h2>
					<ul className="mt-10 text-base">
						<li className="flex items-center">
							<GrStatusGood className="mr-2" /> Manage your
							recipes by the easy way
						</li>
						<li className="flex items-center">
							<GrStatusGood className="mr-2" />
							Discover a lot of others recipes and get new ones
						</li>
						<li className="flex items-center">
							<GrStatusGood className="mr-2" />
							Interact with other users and discuss about their
							recipes
						</li>
						<li className="flex items-center">
							<GrStatusGood className="mr-2" />
							Help others get recipes to serve their daily lives,
							improve nutrition and health
						</li>
					</ul>
				</div>
				<div className="bg-white lg:w-[500px]  rounded-xl pt-6 pb-9 md:px-8 px-4 border my-10 md:shadow-xl">
					<SignUpForm onSubmit={handleSignup} />
				</div>
			</div>
		</div>
	);
}

export default SignUp;
