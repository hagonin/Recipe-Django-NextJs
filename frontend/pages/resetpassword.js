import Link from 'next/link';
import { FiChevronsLeft } from 'react-icons/fi';

import { useRouter } from 'next/router';
import { useAuthContext } from '@context/auth-context';
import {
	ENDPOINT_PASSWORD_RESET_COMPLETE,
	ENDPOINT_REQUEST_RESET_EMAIL,
	images,
} from '@utils/constants';
import api from '@services/axios';

import RequiredEmail from '@components/Form/ResetPasswordForm/RequiredEmail';
import Img from '@components/UI/Image';
import ResetPassword from '@components/Form/ResetPasswordForm/ResetPassword';
import toastMessage from '@utils/toastMessage';

function RequestResetPassword(props) {
	const router = useRouter();
	const { setErrors } = useAuthContext();

	const handleSendRequest = ({ email }) => {
		return api
			.post(ENDPOINT_REQUEST_RESET_EMAIL, {
				email,
				redirect_url: process.env.NEXT_PUBLIC_REQUEST_EMAIL,
			})
			.then((res) => {
				toastMessage({ message: res.data.success });
			})
			.catch();
	};

	const handleChangePassword = ({ password }) => {
		return api
			.patch(ENDPOINT_PASSWORD_RESET_COMPLETE, {
				password: password,
				token: props?.token,
				uidb64: props?.uidb64,
			})
			.then((res) => {
				toastMessage({ message: 'Password reset success.' });
				router.push('/login');
			})
			.catch(({ status, _error }) => {
				if (status === 400) {
					setErrors({ reset: { ..._error } });
				} else if (status === 401) {
					toastMessage({
						message:
							'This required link has expired. Please try new request',
					});
				}
			});
	};

	return (
		<div className="bg-primaryLight">
			<div className="container py-14 ">
				<div className=" md:max-w-[480px] mx-auto bg-white border-border rounded-md py-10 px-10">
					<h2 className="text-center mb-10 flex gap-3 justify-center items-center">
						Reset Password
						<Img
							src={images.resetpassword1}
							alt="resetpassword"
							className="h-8 w-8 -top-1"
						/>
					</h2>
					{props?.token_valid ? (
						<ResetPassword onSubmit={handleChangePassword} />
					) : (
						<RequiredEmail onSubmit={handleSendRequest} />
					)}

					<span className="mt-5 text-center flex items-center justify-center">
						{props?.token_valid && (
							<button
								onClick={() => router.push('/resetpassword')}
								className="flex items-center hover:text-primary"
							>
								<FiChevronsLeft />
								Back make request
							</button>
						)}
						<Link
							href="/login"
							className="ml-2 underline font-semibold hover:text-primary "
						>
							Login
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default RequestResetPassword;

export async function getServerSideProps({ params, req, res, query }) {
	return {
		props: { ...query },
	};
}
