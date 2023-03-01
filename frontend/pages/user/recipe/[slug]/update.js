import { ENDPOINT_CREATE_RECIPE, images } from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecipeContext } from '@context/recipe-context';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import Button from '@components/UI/Button';
import UpdateForm from '@components/Form/AddRecipeForm/UpdateForm';

function Update() {
	const [cancel, setCancel] = useState(false);
	const { getRecipeSingleBySlug } = useRecipeContext();
	const router = useRouter();
	const { slug } = router?.query;
	const [initValues, setInitValues] = useState(null);
	const { configAuth } = useAuthContext();
	const onSubmit = async (data) => {
		console.log('Data before submit', data);
		await api
			.patch(`${ENDPOINT_CREATE_RECIPE}${slug}/`, data, configAuth())
			.then((res) => {
				toast.success('Update recipe success');
				router.push(`/user/recipe/${slug}`);
			})
			.catch(({ _error }) => {
				toast.error('Update failed');
				console.log(_error);
			});
	};
	useEffect(() => {
		getRecipeSingleBySlug(slug).then((res) => setInitValues(res));
	}, []);

	const toggleCancel = () => {
		setCancel(!cancel);
	};

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-4">
				<h1 className="ml-4 mb-14">Update Recipe</h1>
			</div>

			{initValues ? (
				<UpdateForm
					onSubmit={onSubmit}
					handleCancel={toggleCancel}
					initValues={initValues}
				/>
			) : (
				'Loading...'
			)}
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

export default Update;

Update.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
