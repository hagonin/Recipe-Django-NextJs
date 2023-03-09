import { ENDPOINT_RECIPE_READ } from '@utils/constants';
import useSWR from 'swr';
import fetcher from './fetcher';

function useLastestPost(number) {
	return useSWR(`${ENDPOINT_RECIPE_READ}?order_by=created_at`, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
}

export default useLastestPost;
