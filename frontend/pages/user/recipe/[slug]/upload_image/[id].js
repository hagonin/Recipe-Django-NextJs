import { useRouter } from 'next/router';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import {
	ENDPOINT_RECIPE_DETAIL,
} from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import UploadPhoto from '@components/Form/RecipeForm/UploadPhoto';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { TitlePrimary } from '@components/UI/Title';
import toastMessage from '@utils/toastMessage';

function UploadImagePage() {
	const { configAuth } = useAuthContext();
	const router = useRouter();
	const {
		query: { slug, id },
	} = router;

	const onUploadPhoto = async (form) => {
		try {
			await api.patch(
				`${ENDPOINT_RECIPE_DETAIL}${slug}/`,
				form,
				configAuth()
			);
			toastMessage({
				message: 'Photos successfully added',
			});
			router.push(`/user/recipe/${slug}`);
		} catch {}
	};
	return (
		<div className="container py-14">
			<TitlePrimary
				title="Manage photo"
				center
			/>

			<UploadPhoto
				onSubmit={onUploadPhoto}
				recipe={id}
			/>
			<div className="mt-5 font-medium text-base w-[400px]  mx-auto bg-third p-3 rounded-md text-center">
				<div className="flex justify-center">
					<span>
						<MdOutlineTipsAndUpdates className="text-yellow text-3xl relative top-1 mr-2" />
					</span>
					<b>Tips for snapping the perfect recipe photo:</b>
				</div>
				<p>
					(1) Getting the lighting right. (2) Picking the right angle.
					(3)Styling to set the scene. (4) Editing your recipe photos
				</p>
			</div>
		</div>
	);
}

export default UploadImagePage;

UploadImagePage.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
