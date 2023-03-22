import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ENDPOINT_RECIPE } from '@utils/constants';
import fetcher from './fetcher';

const useRecipes = () => {
	const { data, ...rest } = useSWR({ url: ENDPOINT_RECIPE }, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	const [keywords, setKeyWords] = useState([]);
	const [topRating, setTopRating] = useState(null);
	const [photos, setPhotos] = useState(null);
	const [photoRandom, setPhotoRandom] = useState(null);
	useEffect(() => {
		if (data) {
			// get keyword
			const keys = data
				.map((item) => {
					let key = item?.search_vector?.replace(/'/g, '').split(' ');

					return key;
				})
				.flat();
			const newArr = new Set(keys);
			setKeyWords([...newArr]);

			//toprating
			const ratings = data
				.filter((item) => item.rating)
				.sort((a, b) => b.rating - a.rating);
			setTopRating(ratings);

			// collections pics
			let arrPhotos = data.slice(0, 9).map((item) => ({
				id: item.id,
				src: item.main_image,
				slug: item.slug,
			}));
			setPhotos(arrPhotos);
		}
	}, [data]);

	useEffect(() => {
		if (photos) {
			const random = Math.floor(Math.random() * photos.length);
			setPhotoRandom(photos[random]);
		}
	}, [photos]);
	return { data, topRating, keywords, photos, photoRandom, ...rest };
};

export default useRecipes;
