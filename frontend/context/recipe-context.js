const { createContext, useContext, useState } = require('react');

const RecipeContext = createContext();
const RecipeProvider = ({ children }) => {
	const [recipePreview, setRecipePreview] = useState(null);
	return (
		<RecipeContext.Provider value={{ recipePreview, setRecipePreview }}>
			{children}
		</RecipeContext.Provider>
	);
};

export default RecipeProvider;
export const useRecipeContext = () => useContext(RecipeContext);
