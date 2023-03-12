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
	const [topRating, setTopRating] = useState(null);
	useEffect(() => {
		if (data) {
			// get keyword
			const keys = data
				.map((item) => {
					let key = item?.search_vector?.replace(/'/g, '').split(' ');
					return key;
				})
				.flat();
			setKeyWords(keys);

			//toprating
			const ratings = data
				.filter((item) => item.rating)
				.sort((a, b) => b.rating - a.rating);
			setTopRating(ratings);
		}
	}, [data]);
	return { data, topRating, keywords, ...rest };
};

export default useRecipes;
