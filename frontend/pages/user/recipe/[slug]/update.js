import {
	ENDPOINT_CREATE_RECIPE,
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_READ,
	EXIST_RECIPE,
} from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import api from '@services/axios';
import { useAuthContext } from '@context/auth-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecipeContext } from '@context/recipe-context';
import useSWR from 'swr';
import AddUpdateRecipeForm from '@components/Form/RecipeForm/AddUpdateRecipeForm';

function Update() {
	const [cancel, setCancel] = useState(false);
	const router = useRouter();
	const { slug } = router?.query;
	const { fetcher } = useRecipeContext();
	const { data, isLoading, mutate } = useSWR(
		`${ENDPOINT_RECIPE_READ}${slug}/`,
		fetcher
	);
	const [initValue, setInitValue] = useState(null);
	const { configAuth } = useAuthContext();
	const onSubmit = async (data) => {
		console.log('Data before submit', data);
		await api
			.put(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, data, configAuth())
			.then((res) => {
				const { slug } = res?.data;
				toast.success('Update recipe success');
				router.push(`/user/recipe/${slug}`);
			})
			.catch(({ _error }) => {
				const errStr = Object.keys(_error)
					.map((key) => `${key}: ${_error[key]?.[0]}`)
					.join('\r\n');
				toast.error(errStr);
			});
	};

	useEffect(() => {
		if (data) {
			const {
				title,
				description,
				category,
				serving,
				prep_time,
				cook_time,
				image_url,
				ingredients,
				instructions,
				search_vector,
				source,
				notes,
			} = data;
			const obj = {
				title,
				description,
				category,
				serving,
				prep_time,
				cook_time,
				image_url,
				ingredients,
				instructions,
				search_vector,
				source,
				notes,
			};

			if (instructions) {
				let ins = data.instructions.split('<p>');
				ins.shift();
				ins = ins.map((item) => item.split('</p>'));
				ins = ins.map((item) => ({ content: item[0] }));
				obj['instructions'] = ins;
			}

			if (ingredients) {
				let ingre = data.ingredients.map((item) => ({
					...item,
					recipe: EXIST_RECIPE,
				}));
				obj['ingredients'] = ingre;
			}

			if (notes === 'null') {
				obj.notes = JSON.parse(notes);
			}

			setInitValue(obj);
		}
	}, [data]);

	const toggleCancel = () => {
		setCancel(!cancel);
	};

	return (
		<div className="container py-14 lg:w-3/4">
			<div className="flex items-end justify-center mb-4">
				<h1 className="ml-4 mb-14">Update Recipe</h1>
			</div>

			{isLoading || !initValue ? (
				'Loading'
			) : initValue ? (
				<AddUpdateRecipeForm
					onSubmit={onSubmit}
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
