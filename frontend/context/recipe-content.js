import api from '@services/axios';
import { createContext, memo, useContext, useEffect, useState } from 'react';

const RecipeContext = createContext();
function RecipeProvider({ children }) {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		api.get('/recipe/category/')
			.then((res) => setCategories(res.data))
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
