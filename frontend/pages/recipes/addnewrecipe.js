import { images } from '@utils/constants';

import AddRecipeForm from '@components/Form/AddRecipeForm';
import ManageRecipeLayout from '@components/Layouts/ManageRecipeLayout';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';

function AddRecipe() {
	const onSubmit = (data) => {
		console.log(data);
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
