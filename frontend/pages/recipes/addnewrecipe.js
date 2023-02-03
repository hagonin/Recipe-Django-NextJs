import AddRecipeForm from '@components/Form/AddRecipeForm';
import ManageRecipeLayout from '@components/Layouts/ManageRecipeLayout';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import withAuth from '@utils/AuthRoute';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function AddRecipe() {
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-8">
				<Img
					src="/static/images/addrecipe.png"
					alt="add_recipe"
					className="h-24 w-24"
				/>
				<h1 className="ml-4 mb-4">Add Recipe</h1>
			</div>
			<AddRecipeForm onSubmit={onSubmit} />
		</div>
	);
}

export default withAuth(AddRecipe);

// AddRecipe.getLayout = (page) => <ManageRecipeLayout>{page}</ManageRecipeLayout>;
