import { useRecipeContext } from '@context/recipe-context';
import { ENDPOINT_RECIPE_DETAIL } from '@utils/constants';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import PreviewRecipe from '@components/Recipe/PreviewRecipe';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import { Form } from '@components/Form/FormControl';
import IngredientUpdateForm from '@components/Form/Recipe/Ingredient/Update';

function RecipePreView() {
	const {
		deletePhotoById,
		fetcher,
		updateIngredientById,
		addIngredientToRecipe,
		deleteIngredientById,
	} = useRecipeContext();
	const {
		query: { slug },
	} = useRouter();
	const {
		data: recipe,
		isLoading,
		mutate,
		isValidating,
	} = useSWR(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, fetcher);

	const [showModal, setShowModal] = useState(false);

	const handleDeletePhoto = async (id) => {
		await deletePhotoById(id);
		await mutate();
		toast.success('Delete success');
	};

	const [ingredientIdEdit, setIngredientIdEdit] = useState(null);

	const handleEditIngredient = (id) => {
		setIngredientIdEdit(id);
		setShowModal(true);
	};

	const handleModifyIngredient = async (data) => {
		if (data.id) {
			await updateIngredientById(data);
		} else {
			await addIngredientToRecipe({ ...data, recipe: recipe?.id });
		}

		await mutate();
		setShowModal(false);
	};

	const addNewIngredient = () => {
		setShowModal(true);
		setIngredientIdEdit(null);
	};

	const deleteIngredient = async (id) => {
		await deleteIngredientById(id);
		await mutate();
		toast.success('delete success');
	};

	const goToUpload = () =>
		router.push(`/user/recipe/${recipe?.slug}/upload_image/${recipe?.id}`);

	const goToEdit = () => {
		router.push(`/user/recipe/${recipe?.slug}/update`);
	};
	
	return (
		<div className="container py-14">
			{isValidating && 'Validating...'}
			{isLoading ? (
				'LOADING...'
			) : recipe ? (
				<PreviewRecipe
					data={{ ...recipe }}
					handleDeletePhoto={handleDeletePhoto}
					editIngredient={handleEditIngredient}
					addNewIngredient={addNewIngredient}
					deleteIngredient={deleteIngredient}
					goToUpload={goToUpload}
					goToEdit={goToEdit}
				/>
			) : (
				<h2>No preview</h2>
			)}
			<ModalPrimary
				show={showModal}
				handleCloseModal={() => setShowModal(false)}
			>
				<div className="md:w-[450px]">
					<h2 className="mb-6">Add ingredients</h2>
					<IngredientUpdateForm
						ingredient={
							recipe?.ingredients.filter(
								(item) => item.id === ingredientIdEdit
							)[0]
						}
						onSubmit={handleModifyIngredient}
					/>
				</div>
			</ModalPrimary>
		</div>
	);
}

export default RecipePreView;
RecipePreView.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
