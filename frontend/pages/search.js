import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@services/axios';
import { ENDPOINT_RECIPE } from '@utils/constants';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import useSWR from 'swr';

function Search() {
	const { query } = useRouter();
	const [queryParams, setQueryParams] = useState(query);
	const { data, isLoading } = useSWR(
		[ENDPOINT_RECIPE, queryParams],
		([url, queryParams = {}]) => {
			return api.get(url, {
				params: queryParams,
			});
		}
	);

	useEffect(() => {
		console.log(query);
		setQueryParams(query);
	}, [query]);

	return (
		<div className="container">
			<h1 className=" flex gap-2">
				<FaSearch /> Search Result:
				{/* <span>{results && results.length}</span> */}
			</h1>

			<div className="mt-6">
				{isLoading ? (
					'Searching...'
				) : data?.data?.results > 0 ? (
					<div>
						{data?.data?.results.map(({ title, slug, id }) => (
							<Link
								key={id}
								href={`/recipes/${slug}`}
								className="text-2xl font-semibold underline"
							>
								{title}
							</Link>
						))}
					</div>
				) : (
					'No Result'
				)}
			</div>
		</div>
	);
}

export default Search;
Search.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
