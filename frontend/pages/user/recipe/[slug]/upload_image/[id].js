import { useRouter } from 'next/router';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { ENDPOINT_RECIPE_DETAIL, STATUS_EXPIRED } from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import UploadPhoto from '@components/Form/RecipeForm/UploadPhoto';
import { TitlePrimary } from '@components/UI/Title';
import toastMessage from '@utils/toastMessage';
import { AiOutlineDoubleLeft } from 'react-icons/ai';

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
				message: 'Photos successfully changed',
			});
			router.push(`/user/recipe/${slug}`);
		} catch ({ status }) {
			status === STATUS_EXPIRED &&
				router.push('/user/recipe/request_expired');
		}
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
			<button
				className="underline flex items-center gap-2"
				onClick={() => router.push(`/user/recipe/${slug}`)}
			>
				<AiOutlineDoubleLeft />
				Come back
			</button>
		</div>
	);
}

export default UploadImagePage;

UploadImagePage.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
