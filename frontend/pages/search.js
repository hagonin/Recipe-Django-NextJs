import WidgetLayout from '@components/Layouts/WidgetLayout';
import Loader from '@components/UI/Loader';
import api from '@services/axios';
import { ENDPOINT_RECIPE, ENDPOINT_RECIPE_DETAIL } from '@utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Search() {
	const {
		query: { search },
	} = useRouter();
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		api.get(`${ENDPOINT_RECIPE}`, {
			params: {
				search: search,
			},
		})
			.then((res) => setResults(res?.data?.results))
			.catch()
			.finally(setLoading(false));
	}, [search]);
	// const { data, isLoading, mute } = useSWR();
	console.log(results);
	return (
		<div className="container">
			<h1 className=" flex gap-2">
				<FaSearch /> Search Result:
				<span>{results && results.length}</span>
			</h1>

			<div className="mt-6">
				{loading ? 'SEARCHING...' : null}
				{results ? (
					<div>
						{results.map(({ title, slug }) => (
							<Link
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
