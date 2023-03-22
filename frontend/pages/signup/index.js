import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { ENDPOINT_REGISTER, images, meta } from '@utils/constants';

import SignUpForm from '@components/Form/SignUpForm';
import Img from '@components/UI/Image';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import VerifyEmailForm from '@components/Form/VerifyEmaiForm';
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
		<div className="bg-[#ffdff10f] select-none py-8 flex min-h-screen">
			<ModalPrimary
				show={showVerifyModal}
				handleCloseModal={() => setShowVerifyModal(false)}
				noClose={true}
			>
				<div className="md:w-[350px] flex flex-col items-center justify-center py-2 container">
					<Img
						src={images.tick}
						alt="tick"
						className="lg:h-28 lg:w-28  md:h-24 md:w-24 h-16 w-16"
					/>
					<h3 className="mt-4 font-serif">You are registered</h3>
					<p className="mt-2 text-center">
						We have sent an email verify to activate your account.
						<br />
						The link will
						<span className="text-red2 font-semibold"> expire in 3 hours.</span>
						<br />
						Please check it and
						<Button
							className="tag text-primary ml-2"
							onClick={() => router.push('/login')}
						>
							Login
						</Button>
					</p>
					<div className="flex flex-col mt-3 bg-third pt-1 pb-3 px-8 rounded-md">
						<p className="text-base">Don't you see any verify email ?</p>
						<VerifyEmailForm
							handleEffectAfterResend={handleEffectAfterResend}
						/>
					</div>
				</div>
			</ModalPrimary>
			<div className="container m-auto flex justify-center md:flex-row flex-col lg:gap-12 gap-6  ">
				<div className="flex flex-col items-center justify-center">
					<Img
						alt="login"
						src={images.signup}
						className="w-full md:h-72 h-44 md:mb-10 mb-3"
					/>
					<TitlePrimary title="Don't miss out" />
					<h4 className="font-serif mt-2">Join our community today</h4>
					<ul className="p-0 m-0 md:mt-5 mt-3">
						{meta.signup_content.map((item) => (
							<li className="flex text-base" key={item.id}>
								<span className="mr-2 relative top-[6px] text-primary">
									<BsCheck2Circle />
								</span>
								{item.content}
							</li>
						))}
					</ul>
				</div>
				<div className="bg-white lg:w-[500px]  rounded-xl md:pt-6 md:pb-9 py-4 md:px-8 px-4 border md:my-10 my-2 md:shadow-xl">
					<SignUpForm onSubmit={handleSignup} />
				</div>
			</div>
		</div>
	);
}

export default SignUp;
