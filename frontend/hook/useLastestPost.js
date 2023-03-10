import api from '@services/axios';
import { ENDPOINT_RECIPE, ENDPOINT_RECIPE_READ } from '@utils/constants';
import useSWR from 'swr';
import fetcher from './fetcher';

function useLastestPost(number) {
	return useSWR(
		{
			url: `${ENDPOINT_RECIPE}`,
			config: {
				params: {
					ordering: 'created_at',
					p: number,
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

export default useLastestPost;
