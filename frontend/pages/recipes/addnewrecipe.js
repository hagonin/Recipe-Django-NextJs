import { images } from '@utils/constants';

import AddRecipeForm from '@components/Form/AddRecipeForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import api from '@services/axios';

function AddRecipe() {
	const onSubmit = async (data) => {
		console.log('Data before submit', data);
		// try {
		// 	const res = await api.post(
		// 		'/recipe/recipe/',
		// 		{
		// 			...data,
		// 		},
		// 		{
		// 			headers: {
		// 				'Content-type': 'multipart/form-data',
		// 			},
		// 		}
		// 	);
		// 	console.log('RES IN ADD RECIPE', res);
		// } catch (error) {
		// 	console.log('ERROR IN ADD RECIPE', error.response.data);
		// }
	};

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-8">
				<Img
					src={images.addRecipeImg}
					alt="add_recipe"
					className="h-24 w-24"
				/>
				<h1 className="ml-4 mb-4">Add Recipe</h1>
			</div>
			<AddRecipeForm onSubmit={onSubmit} />
		</div>
	);
}

export default AddRecipe;

// AddRecipe.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
