import { useState } from 'react';
import { useRouter } from 'next/router';
import {
	ENDPOINT_CREATE_RECIPE,
	ENDPOINT_RECIPE_DETAIL,
	images,
} from '@utils/constants';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import Button from '@components/UI/Button';
import AddUpdateRecipeForm from '@components/Form/RecipeForm/AddUpdateRecipeForm';

function AddRecipe() {
	const [cancel, setCancel] = useState(false);
	const { configAuth, setErrors } = useAuthContext();
	const router = useRouter();
	const onSubmit = async (data) => {
		await api
			.post(ENDPOINT_RECIPE_DETAIL, data, configAuth())
			.then((res) => {
				const { slug } = res?.data;
				toast.success('Add recipe success');
				router.push(`/user/recipe/${slug}`);
			})
			.catch(({ _error }) => {
				const errStr = Object.keys(_error)
					.map((key) => `${key}: ${_error[key]?.[0]}`)
					.join('<br/>');
				toast.error(errStr);
			});
	};

	const toggleCancel = () => {
		setCancel(!cancel);
	};

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-4">
				<Img
					src={images.addRecipeImg}
					alt="add_recipe"
					className="h-24 w-24"
				/>
				<h1 className="ml-4 mb-4">Add Recipe</h1>
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
					className="cancle mr-6"
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
