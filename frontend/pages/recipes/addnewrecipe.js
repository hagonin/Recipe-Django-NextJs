import AddRecipeForm from '@components/Form/AddRecipeForm';
import ManageRecipeLayout from '@components/Layouts/ManageRecipeLayout';

function AddRecipe() {
	return (
		<div className="container py-14 lg:w-3/4">
			<h1 className="mb-10 text-center ">Add Recipe</h1>
			<AddRecipeForm />
		</div>
	);
}

export default AddRecipe;

// AddRecipe.getLayout = (page) => <ManageRecipeLayout>{page}</ManageRecipeLayout>;
