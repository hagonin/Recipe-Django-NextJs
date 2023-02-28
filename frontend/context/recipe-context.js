import api from '@services/axios';
import { toast } from 'react-toastify';
import { useAuthContext } from './auth-context';

const { createContext, useContext, useState, useEffect } = require('react');

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
	const { token, fetcher } = useAuthContext();
	const [slugCurrent, setSlugCurrent] = useState(null);
	const [loading, setLoading] = useState(true);

	const deleteRecipe = (slug) =>
		api.delete(`/recipe/recipe-create/${slug}`, {
			headers: {
				Authorization: `Bearer ${token.access}`,
			},
		});

	const getRecipeSingle = (slug) => fetcher(`/recipe/recipe-detail/${slug}/`);
	return (
		<RecipeContext.Provider
			value={{
				loading,
				setLoading,
				deleteRecipe,
				getRecipeSingle,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
