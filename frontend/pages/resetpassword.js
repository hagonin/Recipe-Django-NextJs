import ResetPasswordForm from '@components/Form/ResetPasswordForm';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { images } from '@utils/constants';
import Link from 'next/link';
import { FiChevronsLeft } from 'react-icons/fi';

function ResetPassword() {
	const { setErrors } = useAuthContext();
	const onSubmit = async (data) => {
		try {
			const resetRes = await api.post('/user/reset_password/', {
				...data,
			});
			console.log(resetRes);
		} catch (error) {
			if (error?.response?.status === 400) {
				setErrors({ reset: error?.response?.data });
			} else {
				console.log(error.response?.statusText || error.message);
			}
		}
	};
	return (
		<div className="bg-primaryLight">
			<div className="container py-14 ">
				<div className=" md:max-w-[480px] mx-auto bg-white border-border rounded-md py-10 px-10">
					<h2 className="text-center mb-10 flex gap-4 justify-center items-center">
						Reset Password
						<Img
							src={images.resetpassword1}
							alt="resetpassword"
							className="h-9 w-9"
						/>
					</h2>
					<ResetPasswordForm onSubmit={onSubmit} />
					<span className="mt-5 block text-center flex gap-2 items-center justify-center">
						<FiChevronsLeft />
						Back{' '}
						<Link
							href="/login"
							className="text-primary underline"
						>
							Login
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
