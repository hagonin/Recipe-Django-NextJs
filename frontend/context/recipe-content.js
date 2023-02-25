import api from '@services/axios';
import { createContext, memo, useContext, useEffect, useState } from 'react';

const RecipeContext = createContext();
function RecipeProvider({ children }) {
	const [categories, setCategories] = useState([
		{
			id: 1,
			name: 'Breakfast',
		},
		{
			id: 2,
			name: 'Dinner',
		},
	]);
	useEffect(() => {
		api.get('/recipe/categories/')
			.then((res) => setCategories(res.data.results))
			.catch((err) => console.log(err));
	}, []);
	return (
		<RecipeContext.Provider value={{ categories: categories }}>
			{children}
		</RecipeContext.Provider>
	);
}

export default RecipeProvider;

export const useRecipeContext = () => useContext(RecipeContext);
