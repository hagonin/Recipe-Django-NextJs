import api from '@services/axios';
import { ENDPOINT_RECIPE, ENDPOINT_RECIPE_READ } from '@utils/constants';
import useSWR from 'swr';
import fetcher from './fetcher';

function useQuery(numberOfResult, query) {
	return useSWR(
		{
			url: `${ENDPOINT_RECIPE}`,
			config: {
				params: {
					...query,
					p: numberOfResult,
				},
			},
		},
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);
}

export default useQuery;
