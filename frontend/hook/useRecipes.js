import { ENDPOINT_RECIPE } from '@utils/constants';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from './fetcher';

const useRecipes = () => {
	const { data, ...rest } = useSWR({ url: ENDPOINT_RECIPE }, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	const [keywords, setKeyWords] = useState([]);
	useEffect(() => {
		if (data) {
			const keys = data
				.map((item) => {
					let key = item?.search_vector?.replace(/'/g, '').split(' ');
					return key;
				})
				.flat();
			setKeyWords(keys);
		}
	}, [data]);
	return { data, keywords, ...rest };
};

export default useRecipes;
