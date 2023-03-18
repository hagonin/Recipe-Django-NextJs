import { useState, useMemo, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import api from '@services/axios';
import { ENDPOINT_RECIPE } from '@utils/constants';

function usePagination({ limitPerPage = 4, recipes, total, initPages }) {
	const [currentRecipes, setCurrentRecipes] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const pages = useMemo(() => {
		return initPages || Math.ceil(total / limitPerPage);
	});

	const goToPage = () => {
		const firstIndex = currentPage * limitPerPage - limitPerPage;
		const lastIndex = currentPage * limitPerPage;
		const newRecipes = [...recipes].slice(firstIndex, lastIndex);
		setCurrentRecipes(newRecipes);
		window.scrollTo({ top: 0 });
	};

	const next = () => currentPage < pages && setCurrentPage(currentPage + 1);

	const previous = () => currentPage > 1 && setCurrentPage(currentPage - 1);
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
		next,
		previous,
	};
}

function usePaginationByApi(config) {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, mutate, isLoading } = useSWR(
		{
			...config,
			url: config.url || ENDPOINT_RECIPE,
			limit: config.limit,
			page: currentPage,
		},
		({ url, limit, page, ...config }) =>
			api.get(url, {
				params: {
					p: limit,
					page: page,
					...config,
				},
			})
	);
	const pages = useMemo(() => {
		return data?.data?.total_pages;
	}, [data]);

	const next = useCallback(() => {
		currentPage < pages && setCurrentPage(currentPage + 1);
	}, [pages, currentPage]);

	const previous = useCallback(() => {
		currentPage > 1 && setCurrentPage(currentPage - 1);
	}, [pages, currentPage]);

	useEffect(() => {
		mutate().then(() => window.scrollTo({ top: 0 }));
	}, [currentPage]);

	return {
		currentRecipes: data?.data?.results,
		currentPage,
		pages,
		setCurrentPage,
		next,
		previous,
		isLoading,
		mutate,
	};
}

export default usePagination;
export { usePaginationByApi };
