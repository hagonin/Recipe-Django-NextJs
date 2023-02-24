import { useRouter } from 'next/router';
import { images } from '@utils/constants';
import { toast } from 'react-toastify';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';

import ChangePasswordForm from '@components/Form/ChangePasswordForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';

function Changepassword() {
	const { setErrors, token } = useAuthContext();
	const router = useRouter();
	const onSubmit = async (data) => {
		try {
			await api.put(
				'/user/change_password/',
				{
					...data,
				},
				{
					headers: {
						Authorization: `Bearer ${token.access}`,
					},
				}
			);
			toast.success('Password successfully changed');
			router.push('/user/profile');
		} catch ({ status, _error }) {
			if (status === 400) {
				setErrors({ change_password: { ..._error } });
			}
		}
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
