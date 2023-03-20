function ShowPages({ pages, currentPage, isSearch }) {
	return pages ? (
		<span className="md:text-lg text-base text-black text-right leading-5">
			Showing
			<span className="md:text-lg text-base font-bold mx-1">{currentPage}</span>
			{`of ${pages} page${pages > 1 ? 's' : ''}`}
		</span>
	) : (
		<></>
	);
}

export default ShowPages;
