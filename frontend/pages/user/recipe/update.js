import { images } from '@utils/constants';

import AddRecipeForm from '@components/Form/AddRecipeForm';
import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import Img from '@components/UI/Image';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecipeContext } from '@context/recipe-context';
import ModalPrimary from '@components/UI/Modal/ModalPrimary';
import Button from '@components/UI/Button';
import createMarkup from '@utils/createMarkup';
import formatDate from '@utils/formatdate';
import handleResDataForPreView from '@utils/handleResForPreview';
import UpdateForm from '@components/Form/AddRecipeForm/UpdateForm';

function Update() {
	const [cancel, setCancel] = useState(false);
	const { token, setErrors } = useAuthContext();
	const { recipeCurrent, setCurrentRecipe } = useRecipeContext();
	const router = useRouter();
	const onSubmit = async (data) => {
		console.log('Data before submit', data);
		// await api
		// 	.post('/recipe/recipe-create/', data, {
		// 		headers: {
		// 			'Content-type': 'multipart/form-data',
		// 			Authorization: `Bearer ${token.access}`,
		// 		},
		// 	})
		// 	.then((res) => {
		// 		const { slug } = res?.data;
		// 		const data = handleResDataForPreView(res);
		// 		setCurrentRecipe(data);
		// 		toast.success('Add recipe success');
		// 		router.push(`/user/recipe/${slug}`);
		// 	})
		// 	.catch(({ _error }) => {
		// 		console.log(_error);
		// 		// const errStr = Object.keys(_error)
		// 		// 	.map((key) => {
		// 		// 		const str = _error[key]
		// 		// 			.map((message) => message)
		// 		// 			.join('<br/>');
		// 		// 		return `${key}: ${str}`;
		// 		// 	})
		// 		// 	.join('<br/>');
		// 		// toast.error(errStr);
		// 	});
	};

	const toggleCancel = () => {
		setCancel(!cancel);
	};

	!recipeCurrent && router.push('/user/profile');
	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-4">
				{/* <Img
					src={images.addRecipeImg}
					alt="add_recipe"
					className="h-24 w-24"
				/> */}
				<h1 className="ml-4 mb-14">Update Recipe</h1>
			</div>
			{/* <p className="text-center mb-12">
				Uploading personal recipes is easy! Add yours to your favorites,
				share with friends, family, or the HomeCook community.
			</p> */}
			<UpdateForm
				onSubmit={onSubmit}
				handleCancel={toggleCancel}
				initValues={recipeCurrent}
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

export default Update;

Update.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
