import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { ENDPOINT_RECIPE_IMAGE, images } from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import UploadPhoto from '@components/Form/RecipeForm/UploadPhoto';
import Img from '@components/UI/Image';
import { GrTip } from 'react-icons/gr';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';

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
		} catch {}
	};
	return (
		<div className="container py-14">
			<h1 className="text-center mb-14">Upload photo</h1>

			<div className="">
				<UploadPhoto
					onSubmit={onUploadPhoto}
					recipe={id}
				/>
			</div>
			<div className="mt-5 font-medium text-base w-[400px]  mx-auto bg-third p-3 rounded-md text-center">
				<span className="flex justify-center">
					<span>
						<MdOutlineTipsAndUpdates className="text-yellow text-3xl relative top-1 mr-2" />
					</span>
					<b>Tips for snapping the perfect recipe photo:</b>
				</span>
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
