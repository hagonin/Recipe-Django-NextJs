import UpdateProfileForm from '@components/Form/UpdateProfileForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import { useAuthContext } from '@context/auth-context';

function UpdateProfile() {
	const { user, updateProfile } = useAuthContext();
	const onSubmit = (data) => {
		return updateProfile({ ...data });
	};
	return (
		<div className="container py-14">
			<h1 className="text-center mb-16">Update Profile</h1>

			<UpdateProfileForm
				{...user}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default UpdateProfile;

// UpdateProfile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
