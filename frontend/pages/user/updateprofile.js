import UpdateProfileForm from '@components/Form/UpdateAccountForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import { TitlePrimary } from '@components/UI/Title';
import { useAuthContext } from '@context/auth-context';

function UpdateProfile() {
	const { user, updateProfile } = useAuthContext();
	return (
		<div className="container py-14 ">
			<TitlePrimary title="Update Profile" center/>
			<UpdateProfileForm
				{...user}
				onSubmit={updateProfile}
			/>
		</div>
	);
}

export default UpdateProfile;

UpdateProfile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
