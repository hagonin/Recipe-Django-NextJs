import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import api from '@services/axios';
import { ENDPOINT_RECIPE, images } from '@utils/constants';
import { useRecipeContext } from '@context/recipe-context';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import RecipeCard from '@components/Recipe/RecipeCard';
import Img from '@components/UI/Image';
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
			<div className=" flex gap-3">
				{data?.data?.results.length > 0 && (
					<span className="text-xl text-black">
						Showing
						<span className="mx-2 text-2xl text-black font-semibold">
							{data?.data?.results.length}
						</span>
						{`result${
							data?.data?.results.length > 1 ? 's' : ''
						} for `}
						<span className="text-xl text-black font-semibold">
							{query.search || query.ingredients__title}
						</span>
					</span>
				)}
			</div>

			{isLoading || isValidating ? (
				<div className="flex justify-center my-10">
					<Loader type="searching" />
				</div>
			) : (
				<div className="md:mt-5 my-4 flex flex-col gap-4">
					{data?.data?.results.length > 0 ? (
						data?.data?.results.map((item, index) => (
							<RecipeCard
								key={item.id}
								slug={item.slug}
								name={item.title}
								main_image={item.main_image}
								date={item.updated_at}
								reviews_count={item.reviews_count}
								rating={item.rating}
								lastestRecipe
								firstPost={index === 0}
							/>
						))
					) : (
						<>
							<div className="flex justify-center items-center mb-10 gap-2">
								<div>
									<Img
										src={images.no_search}
										alt="no result"
										className="h-20 w-20"
									/>
								</div>
								<span className="text-center text-lg md:w-1/3 ">
									Sorry, we couldn’t find any matches for
									<span className="text-lg font-semibold mx-1 text-black">
										{query.search ||
											query.ingredients__title}
									</span>
									recipes
								</span>
							</div>

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
