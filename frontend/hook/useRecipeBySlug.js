import { ENDPOINT_RECIPE_READ } from '@utils/constants';
import useSWR from 'swr';
import fetcher from './fetcher';

function useRecipeBySlug(slug) {
	return useSWR(`${ENDPOINT_RECIPE_READ}${slug}/`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
}

export default useRecipeBySlug;
