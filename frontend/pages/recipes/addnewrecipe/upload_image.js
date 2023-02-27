import UploadPhoto from '@components/Form/AddRecipeForm/UploadPhoto';
import Button from '@components/UI/Button';
import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import api from '@services/axios';

function UploadImagePage() {
	const { token } = useAuthContext();
	const { recipePreview } = useRecipeContext();
	console.log(recipePreview);
	const onUploadImg = async ({ form }) => {
		console.log(form);
		// try {
		// 	const res = await api.post('/recipe/recipe-image/', form, {
		// 		headers: {
		// 			'Content-type': 'multipart/form-data',
		// 			Authorization: `Bearer ${token.access}`,
		// 		},
		// 	});
		// 	console.log(res);
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	return (
		<div className="container py-14">
			<Button>Upload image</Button>
			<UploadPhoto onSubmit={onUploadImg} />
		</div>
	);
}

export default UploadImagePage;
