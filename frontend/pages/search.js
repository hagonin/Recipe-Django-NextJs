import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@services/axios';
import {
	ENDPOINT_RECIPE,
	ENDPOINT_RECIPE_READ,
	images,
} from '@utils/constants';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import useSWR from 'swr';
import RecipeCard from '@components/Recipe/RecipeCard';
import Img from '@components/UI/Image';
import { useRecipeContext } from '@context/recipe-context';
import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import TopRating from '@components/Recipe/TopRating';

function Search() {
	const router = useRouter();
	const { topRating } = useRecipeContext();
	const { query } = router;

	const [queryParams, setQueryParams] = useState(query);
	const { data, isLoading, isValidating } = useSWR(
		[ENDPOINT_RECIPE, queryParams],
		([url, queryParams = {}]) => {
			return api.get(url, {
				params: queryParams,
				cd: Date.now(),
			});
		}
	);

	useEffect(() => {
		setQueryParams(query);
	}, [query]);

	return (
		<div className="container">
			<h1 className=" flex gap-4">
				<FaSearch className="relative top-[1px]" /> Search Result:
				{data?.data?.results.length > 0 && data?.data?.results.length}
			</h1>

			{isLoading || isValidating ? (
				<div className="flex justify-center mt-10">
					<Loader type="searching" />
				</div>
			) : (
				<div className="mt-7 flex flex-col gap-4">
					{data?.data?.results.length > 0 ? (
						data?.data?.results.map((item) => (
							<RecipeCard
								key={item.id}
								slug={item.slug}
								name={item.title}
								main_image={item.main_image}
								date={item.updated_at}
								reviews_count={item.reviews_count}
								rating={item.rating}
								lastPost
							/>
						))
					) : (
						<>
							<Img
								src={images.no_search}
								alt="no result"
								className="h-24 w-24 mx-auto my-10"
							/>
							<h4 className="text-center mb-16">
								Sorry. No result found.
							</h4>

							<TopRating recipes={topRating} />
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Search;
Search.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
