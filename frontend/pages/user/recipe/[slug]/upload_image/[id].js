import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { ENDPOINT_RECIPE_IMAGE } from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import UploadPhoto from '@components/Form/RecipeForm/UploadPhoto';

function UploadImagePage() {
	const { configAuth } = useAuthContext();
	const router = useRouter();
	const {
		query: { slug, id },
	} = router;

	const onUploadPhoto = async (form) => {
		try {
			await api.post(ENDPOINT_RECIPE_IMAGE, form, configAuth());
			toast.success('Upload new photo success');
			router.push(`/user/recipe/${slug}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="container py-14">
			<h1 className="text-center mb-10">Upload photo</h1>
			<UploadPhoto
				onSubmit={onUploadPhoto}
				recipe={id}
			/>
		</div>
	);
}

export default UploadImagePage;

UploadImagePage.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
