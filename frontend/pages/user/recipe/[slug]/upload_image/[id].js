import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import toastMessage from '@utils/toastMessage';
import { ENDPOINT_RECIPE_DETAIL } from '@utils/constants';
import { handleExpired, STATUS_EXPIRED } from '@utils/expired_time';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import UploadPhoto from '@components/Form/RecipeForm/UploadPhoto';
import { TitlePrimary } from '@components/UI/Title';

function UploadImagePage() {
	const { configAuth, user } = useAuthContext();
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
				message: 'Photos successfully changed',
			});
			router.push(`/user/recipe/${slug}`);
		} catch ({ status }) {
			if (status === STATUS_EXPIRED) {
				handleExpired(user.id);
				router.push('/user/recipe/request_expired');
			}
		}
	};
	return (
		<div className="container py-14">
			<TitlePrimary title="Manage photo" center />

			<UploadPhoto onSubmit={onUploadPhoto} recipe={id} />
			<button
				className="flex items-center gap-2"
				onClick={() => router.push(`/user/recipe/${slug}`)}
			>
				<BsArrowLeft />
				Back
			</button>
		</div>
	);
}

export default UploadImagePage;

UploadImagePage.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
