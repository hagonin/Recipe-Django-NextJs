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
import Button from '@components/UI/Button';

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
				show={showVerifyModal}
				handleCloseModal={() => setShowVerifyModal(false)}
				noClose={true}
			>
				<div className="md:w-[350px] flex flex-col items-center justify-center py-2 container">
					<Img
						src={images.tick}
						alt="tick"
						className="lg:h-28 lg:w-28  md:h-24 md:w-24 h-20 w-20"
					/>
					<h3 className="mt-4 ">You are registered</h3>
					<p className="mt-2 text-center">
						We have sent an email verify to activate your account.
						<br />
						The link will
						<b> expire in 3 hours.</b>
						<br />
						Please check it and
						<Button
							className="tag text-primary ml-2"
							onClick={() => router.push('/login')}
						>
							Login
						</Button>
					</p>
					<div className="flex flex-col mt-3">
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
