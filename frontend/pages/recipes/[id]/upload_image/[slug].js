import UploadPhoto from '@components/Form/AddRecipeForm/UploadPhoto';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function UploadImagePage() {
	const { token } = useAuthContext();
	const router = useRouter();

	const onUploadImg = async (form) => {
		try {
			await api.post('/recipe/recipe-image/', form, {
				headers: {
					'Content-type': 'multipart/form-data',
					Authorization: `Bearer ${token.access}`,
				},
			});
			toast.success('Upload new photo success');
			router.push(`/user/recipe/${router?.query?.slug}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="container py-14">
			<h1 className="text-center mb-10">Upload photo</h1>
			<UploadPhoto
				onSubmit={onUploadImg}
				recipe={router?.query?.id}
			/>
		</div>
	);
}

export default UploadImagePage;

UploadImagePage.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
