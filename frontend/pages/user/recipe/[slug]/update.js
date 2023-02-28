import { images } from '@utils/constants';

import AddRecipeForm from '@components/Form/AddRecipeForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecipeContext } from '@context/recipe-context';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import Button from '@components/UI/Button';
import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import handleResDataForPreView from '@utils/handleResForPreview';
import UpdateForm from '@components/Form/AddRecipeForm/UpdateForm';

function Update() {
	const [cancel, setCancel] = useState(false);
	const { getRecipeSingle } = useRecipeContext();
	const {
		query: { slug },
	} = useRouter();
	const [initValues, setInitValues] = useState(null);
	const { token } = useAuthContext();
	const onSubmit = async (data) => {
		console.log('Data before submit', data);
		await api
			.patch(`/recipe/recipe-create/${slug}/`, data, {
				headers: {
					'Content-type': 'multipart/form-data',
					Authorization: `Bearer ${token.access}`,
				},
			})
			.then((res) => {
				toast.success('Add recipe success');
				console.log(res);
			})
			.catch(({ _error }) => {
				console.log(_error);
			});
	};
	useEffect(() => {
		getRecipeSingle(slug).then((res) => setInitValues(res));
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
