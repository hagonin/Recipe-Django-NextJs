import ChangePasswordForm from '@components/Form/ChangePasswordForm';
import ResetPasswordForm from '@components/Form/ResetPasswordForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { images } from '@utils/constants';
import Link from 'next/link';

function Changepassword() {
	const { setErrors } = useAuthContext();
	const onSubmit = async (data) => {
		console.log(data);
		// try {
		// 	const resetRes = await api.post('/user/reset_password/', {
		// 		...data,
		// 	});
		// 	console.log(resetRes);
		// } catch (error) {
		// 	if (error?.response?.status === 400) {
		// 		setErrors({ reset: error?.response?.data });
		// 	} else {
		// 		console.log(error.response?.statusText || error.message);
		// 	}
		// }
	};
	return (
		<div className="bg-primaryLight">
			<div className="container py-14 ">
				<div className=" md:max-w-[480px] mx-auto bg-white border-border rounded-md py-10 px-10">
					<h2 className="text-center mb-10 flex gap-4 justify-center items-center">
						Change Password
						<Img
							src={images.resetpassword}
							alt="resetpassword"
							className="h-10 w-10"
						/>
					</h2>
					<ChangePasswordForm onSubmit={onSubmit} />
				</div>
			</div>
		</div>
	);
}

export default Changepassword;

Changepassword.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
