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
import { TitlePrimary } from '@components/UI/Title';

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
				toastMessage({ message: 'Your password has been reset successfully.' });
				router.push('/login');
			})
			.catch(({ status, _error }) => {
				if (status === 400) {
					setErrors({ reset: { ..._error } });
				} else if (status === 401) {
					toastMessage({
						message:
							'The requested link has expired. Please submit a new request!',
					});
				}
			});
	};

	return (
		<div className="bg-primaryLight min-h-screen flex ">
			<div className="container py-14 m-auto">
				<div className="md:max-w-[480px] shadow-lg mx-auto bg-white border-border rounded-md py-10 lg:px-10 md:px-8 px-4">
					<div className="text-center mb-10 flex gap-3 justify-center items-center">
						<TitlePrimary title="Reset Password" />
						<Img
							src={images.resetpassword1}
							alt="resetpassword"
							className="h-8 w-8 -top-1"
						/>
					</div>
					{props?.token_valid ? (
						<ResetPassword onSubmit={handleChangePassword} />
					) : (
						<RequiredEmail onSubmit={handleSendRequest} />
					)}

					<div className="mt-5 text-center flex flex-col  items-center justify-center">
						{props?.token_valid && (
							<button
								onClick={() => router.push('/resetpassword')}
								className="flex items-center hover:text-primary"
							>
								<FiChevronsLeft />
								Please make a new request
							</button>
						)}
						<Link
							href="/login"
							className="ml-2 underline font-semibold hover:text-primary flex items-center gap-2 "
						>
							Login
						</Link>
					</div>
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
