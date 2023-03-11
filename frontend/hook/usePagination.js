import { useState, useRef, useMemo, useEffect } from 'react';

function usePagination({ page = 4, recipes }) {
	const [currentRecipes, setCurrentRecipes] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const recipePerPage = useRef(page);

	const limit = useMemo(() => {
		if (recipes) {
			return (recipes?.length / recipePerPage.current).toFixed(0) * 1;
		}
	}, [recipes]);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const previousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	useEffect(() => {
		if (recipes) {
			const lastIndex = recipePerPage.current * currentPage;
			const firstIndex = lastIndex - recipePerPage.current;
			const results = [...recipes].slice(firstIndex, lastIndex);
			setCurrentRecipes(results);
		}
	}, [recipes, currentPage]);
	return {
		nextPage,
		previousPage,
		currentRecipes,
		currentPage,
		limit,
	};
}

export default usePagination;
