import UpdateProfileForm from '@components/Form/UpdateAccountForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import { useAuthContext } from '@context/auth-context';

function UpdateProfile() {
	const { user, updateProfile } = useAuthContext();
	return (
		<div className="container py-14 ">
			<h1 className="text-center mb-16">Update Profile</h1>

			<UpdateProfileForm
				{...user}
				onSubmit={updateProfile}
			/>
		</div>
	);
}

export default UpdateProfile;

UpdateProfile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
