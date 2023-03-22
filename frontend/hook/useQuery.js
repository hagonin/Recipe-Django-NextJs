import useSWR from 'swr';
import { ENDPOINT_RECIPE } from '@utils/constants';
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
