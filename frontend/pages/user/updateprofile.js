import UpdateProfileForm from '@components/Form/UpdateProfileForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';

function UpdateProfile() {
	return (
		<div className="container py-14">
			<h1 className="text-center mb-10">Update Profile</h1>
			<UpdateProfileForm />
		</div>
	);
}

export default UpdateProfile;

UpdateProfile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
