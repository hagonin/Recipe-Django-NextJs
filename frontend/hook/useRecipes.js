import { ENDPOINT_RECIPE } from '@utils/constants';
import useSWR from 'swr';
import fetcher from './fetcher';

const useRecipes = () => {
	return useSWR(ENDPOINT_RECIPE, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
};

export default useRecipes;
