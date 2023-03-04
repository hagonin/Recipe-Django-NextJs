import api from '@services/axios';
import {
	ENDPOINT_CREATE_RECIPE,
	ENDPOINT_INGREDIENT,
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_IMAGE,
} from '@utils/constants';
import { toast } from 'react-toastify';
import { useAuthContext } from './auth-context';

const { createContext, useContext, useState, useEffect } = require('react');

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const { configAuth, user } = useAuthContext();
	const [loading, setLoading] = useState(true);

	const deleteRecipe = (slug) =>
		api.delete(`${ENDPOINT_RECIPE_DETAIL}${slug}/`, configAuth());

	const deletePhotoById = (id) =>
		api.delete(`${ENDPOINT_RECIPE_IMAGE}${id}/`, configAuth());

	const updateIngredientById = ({ id, title, desc, unit, quantity }) => {
		return api.patch(
			`${ENDPOINT_INGREDIENT}${id}/`,
			{
				title,
				unit,
				quantity,
				desc,
			},
			configAuth()
		);
	};

	const addIngredientToRecipe = ({ title, desc, unit, quantity, recipe }) => {
		return api.post(
			ENDPOINT_INGREDIENT,
			{
				title,
				desc,
				unit,
				quantity,
				recipe,
			},
			configAuth()
		);
	};

	const deleteIngredientById = (id) =>
		api.delete(`${ENDPOINT_INGREDIENT}${id}/`, configAuth());
	const fetcher = async (url) =>
		await api
			.get(url, configAuth())
			.then((res) => res?.data?.results || res?.data);

	return (
		<RecipeContext.Provider
			value={{
				loading,
				setLoading,
				deleteRecipe,
				fetcher,
				deletePhotoById,
				updateIngredientById,
				addIngredientToRecipe,
				deleteIngredientById,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
