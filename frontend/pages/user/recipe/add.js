import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { handleExpired, STATUS_EXPIRED } from '@utils/expired_time';
import { ENDPOINT_RECIPE_DETAIL, images } from '@utils/constants';
import toastMessage from '@utils/toastMessage';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import Button from '@components/UI/Button';
import AddUpdateRecipeForm from '@components/Form/RecipeForm/AddUpdateRecipeForm';
import { useRecipeContext } from '@context/recipe-context';
import { TitlePrimary } from '@components/UI/Title';

function AddRecipe() {
	const [cancel, setCancel] = useState(false);
	const { configAuth, user } = useAuthContext();
	const { mutateRecipes } = useRecipeContext();
	const router = useRouter();
	const onSubmit = useCallback(async ({ form }) => {
		try {
			const res = await api.post(
				ENDPOINT_RECIPE_DETAIL,
				form,
				configAuth()
			);
			await mutateRecipes();
			toastMessage({
				message: 'Recipe successfully added',
			});
			const { slug } = res?.data;
			router.push(`/user/recipe/${slug}`);
		} catch ({ _error, status, error }) {
			if (status === STATUS_EXPIRED) {
				handleExpired(user.id);
				router.push('/user/recipe/request_expired');
			}
			_error?.ingredients &&
				toastMessage({
					message: 'Ingredient title must make a unique set.',
					type: 'error',
				});
		}
	});

	const toggleCancel = () => {
		setCancel(!cancel);
	};

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-center gap-4 justify-center">
				<Img
					src={images.addRecipeImg}
					alt="add_recipe"
					className="h-24 w-24 -top-3"
				/>
				<TitlePrimary
					title="Add Recipe"
					center
				/>
			</div>
			<p className="text-center mb-16">
				Uploading personal recipes is easy! Add yours to your favorites,
				share with friends, family, or the HomeCook community.
			</p>
			<AddUpdateRecipeForm
				onSubmit={onSubmit}
				handleCancel={toggleCancel}
			/>
			<ModalPrimary
				handleCloseModal={toggleCancel}
				show={cancel}
			>
				<h1 className="text-red mb-5">Leave Confirm</h1>
				<p className="mb-5 text-center">
					Are you sure you want to leave this page? <br /> Your
					changes will be lost if you go back.
				</p>
				<Button
					onClick={toggleCancel}
					className="outline mr-4"
				>
					Stay on Page
				</Button>
				<Button
					onClick={() => router.push('/')}
					className="verify lg"
				>
					Leave Page
				</Button>
			</ModalPrimary>
		</div>
	);
}

export default AddRecipe;

AddRecipe.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
