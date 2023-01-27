import { ImSearch } from 'react-icons/im';

function SearchForm() {
	return (
		<form>
			<div className="flex">
				<button className="px-2">
					<ImSearch />
				</button>
				<input
					id="search"
					name="search"
					type="text"
					placeholder="Type to search"
					className="pr-2 placeholder-white bg-transparent outline-none"
				/>
			</div>
		</form>
	);
}

export default SearchForm;
