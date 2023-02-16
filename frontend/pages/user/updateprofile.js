import UpdateProfileForm from '@components/Form/UpdateProfileForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import { useAuthContext } from '@context/auth-context';

function UpdateProfile() {
	const { user } = useAuthContext();
	const fakeInfo = {
		username: 'Marry',
		first_name: 'Marry',
		last_name: 'Luxu',
		bio: 'Hello.',
		avatar: null,
	};
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className="container py-14">
			<h1 className="text-center mb-16">Update Profile</h1>

			<UpdateProfileForm
				{...fakeInfo}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default UpdateProfile;

// UpdateProfile.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
