import api from '@services/axios';
import { toast } from 'react-toastify';
import { useAuthContext } from './auth-context';

const { createContext, useContext, useState, useEffect } = require('react');

const RecipeContext = createContext();
const RecipeProvider = ({ children }) => {
	const [recipeCurrent, setCurrentRecipe] = useState(null);
	const [recipes, setRecipes] = useState(null);
	const { token } = useAuthContext();
	const [slugCurrent, setSlugCurrent] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		token.access && getAllRecipes();
	}, [token]);
	const getAllRecipes = async () => {
		setLoading(true);
		try {
			const res = await api.get('/recipe/recipe-detail/', {
				headers: {
					Authorization: `Beaeer ${token.access}`,
				},
			});
			const { results } = res.data;
			const recipes = results.map(
				({
					id,
					slug,
					title: name,
					user: author,
					image_url: image,
					created_at: date,
				}) => ({ id, slug, name, author, image, date })
			);
			setRecipes(recipes);
		} catch (err) {
			console.log('err from get app recipes', err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<RecipeContext.Provider
			value={{
				recipes,
				recipeCurrent,
				setCurrentRecipe,
				loading,
				setLoading,
				getAllRecipes,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
