import { useRouter } from 'next/router';

import { ENDPOINT_CHANGE_PASSWORD, images } from '@utils/constants';
import toastMessage from '@utils/toastMessage';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';

import ChangePasswordForm from '@components/Form/ChangePasswordForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import { TitlePrimary } from '@components/UI/Title';

function Changepassword() {
	const { setErrors, errors, configAuth } = useAuthContext();
	const router = useRouter();
	const onSubmit = async (data) => {
		try {
			await api.put(
				ENDPOINT_CHANGE_PASSWORD,
				{
					...data,
				},
				configAuth()
			);
			toastMessage({
				message: 'Password successfully changed',
			});
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
				<div className=" md:max-w-[480px] mx-auto bg-white shadow-md border-border rounded-md md:py-10 md:px-10 py-6 px-4">
					<div className="mb-4 flex gap-4 justify-center items-center">
						
						<TitlePrimary title='Change Password'/>
						<Img
							src={images.resetpassword}
							alt="resetpassword"
							className="h-10 w-10"
						/>
					</div>
					<ChangePasswordForm onSubmit={onSubmit} />
				</div>
			</div>
		</div>
	);
}

export default Changepassword;

Changepassword.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
