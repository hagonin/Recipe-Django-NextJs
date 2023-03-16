import { useState, useRef, useMemo, useEffect } from 'react';

function usePagination({ limitPerPage = 4, recipes, total }) {
	const [currentRecipes, setCurrentRecipes] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const pages = useMemo(() => {
		return Math.ceil(total / limitPerPage);
	});

	const goToPage = () => {
		const firstIndex = currentPage * limitPerPage - limitPerPage;
		const lastIndex = currentPage * limitPerPage;
		const newRecipes = [...recipes].slice(firstIndex, lastIndex);
		setCurrentRecipes(newRecipes);
	};

	useEffect(() => {
		if (recipes) {
			goToPage();
		}
	}, [currentPage, recipes]);
	return {
		currentRecipes,
		currentPage,
		pages,
		setCurrentPage,
	};
}

export default usePagination;
