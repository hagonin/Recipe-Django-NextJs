import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ENDPOINT_RECIPE_DETAIL, ENDPOINT_RECIPE_READ } from '@utils/constants';
import { handleExpired, STATUS_EXPIRED } from '@utils/expired_time';

import { useAuthContext } from '@context/auth-context';
import { useRecipeContext } from '@context/recipe-context';
import api from '@services/axios';
import noCache from '@utils/noCache';
import toastMessage from '@utils/toastMessage';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import AddUpdateRecipeForm from '@components/Form/RecipeForm/AddUpdateRecipeForm';
import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import { getInstructionAsArr } from '@utils/handleInstruction';
import { TitlePrimary } from '@components/UI/Title';

function Update() {
	const { user } = useAuthContext();
	const [initValue, setInitValue] = useState(null);
	const [cancel, setCancel] = useState(false);
	const router = useRouter();
	const { slug } = router?.query;
	const { configAuth } = useAuthContext();
	const { setLoading, mutateRecipes, setSlugUpdate } = useRecipeContext();

	const onSubmitUpdate = useCallback(async ({ form }) => {
		await api
			.put(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, form, configAuth())
			.then(async (res) => {
				await mutateRecipes();
				toastMessage({
					message: 'Recipe successfully updated',
				});
				router.push(`/user/recipe/${res?.data?.slug}`);
				setSlugUpdate(res?.data?.slug);
			})
			.catch(({ _error, status }) => {
				_error.ingredients &&
					toastMessage({
						message: 'Ingredient title must make a unique set.',
						type: 'error',
					});

				if (status === STATUS_EXPIRED) {
					handleExpired(user.id);
					router.push('/user/recipe/request_expired');
				}
			});
	});

	const handleKeyWord = useCallback((key) => key.replace(/'/g, ''));

	useEffect(() => {
		setLoading(true);
		api.get(`${ENDPOINT_RECIPE_READ}${slug}/${noCache()}`)
			.then(({ data }) => {
				if (data) {
					if (data.instructions) {
						data.instructions = getInstructionAsArr(
							data.instructions
						);
					}

					if (data.ingredients) {
						data.ingredients = handleIngredientFromArr(
							data.ingredients
						);
					}
					if (data.notes === 'null') {
						data.notes = JSON.parse(data.notes);
					}

					if (data.search_vector) {
						data.search_vector = handleKeyWord(data.search_vector);
					}

					setInitValue({ ...data });
				}
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const toggleCancel = useCallback(() => {
		setCancel(!cancel);
	});

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-10">
				<TitlePrimary
					title="Update Recipe"
					center
				/>
			</div>

			{initValue ? (
				<AddUpdateRecipeForm
					onSubmit={onSubmitUpdate}
					handleCancel={toggleCancel}
					initValues={initValue}
					isUpdate
				/>
			) : null}
		</div>
	);
}

export default Update;

Update.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
