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
import LastPost from '@components/Recipe/LastestRecipes';
import Img from '@components/UI/Image';
import { useRecipeContext } from '@context/recipe-context';
import Button from '@components/UI/Button';

function Search() {
	const router = useRouter();
	const { query } = router;
	const { keywords } = useRecipeContext();

	const [queryParams, setQueryParams] = useState(query);
	const { data, isLoading, isValidating } = useSWR(
		[ENDPOINT_RECIPE_READ, queryParams],
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
			<h1 className=" flex gap-2">
				<FaSearch className="relative top-[1px]" /> Search Result:
				{/* <span>{results && results.length}</span> */}
			</h1>
			<div className="flex gap-2 mt-4">
				{keywords.map((item) => (
					<Button
						className="tag"
						onClick={() =>
							router.push({
								pathname: '/search',
								query: {
									search: item,
								},
							})
						}
					>
						{item}
					</Button>
				))}
			</div>

			<div className="mt-6">
				{isLoading || isValidating ? (
					<span className="text-lg">Searching...</span>
				) : (
					<>
						{data?.data?.results.length > 0 ? (
							data?.data?.results.map((item) => (
								<RecipeCard
									key={item.id}
									slug={item.slug}
									name={item.title}
									main_image={item.main_image}
									date={item.updated_at}
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
								<h2 className="mb-4">Discover lastest post</h2>
								<LastPost />
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Search;
Search.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
